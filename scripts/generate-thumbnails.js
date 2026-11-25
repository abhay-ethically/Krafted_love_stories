// Pure CommonJS — no TypeScript imports
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');
const ffmpegPath = require('ffmpeg-static');
const { execSync } = require('child_process');

const mediaPath = path.resolve('src/lib/media.json');
const media = JSON.parse(fs.readFileSync(mediaPath, 'utf8'));
const thumbDir = path.resolve('public/images/thumbs');
fs.mkdirSync(thumbDir, { recursive: true });

(async () => {
  let done = 0;
  for (const item of media) {
    const srcPath = path.resolve('public/images/original', item.filename);
    if (!fs.existsSync(srcPath)) continue;

    const hash = crypto.createHash('md5').update(item.filename).digest('hex').slice(0, 8);
    const thumbName = `${hash}.webp`;
    const thumbPath = path.join(thumbDir, thumbName);

    try {
      if (item.ext === 'jpg') {
        if (!fs.existsSync(thumbPath)) {
          await sharp(srcPath)
            .resize({ width: 800, withoutEnlargement: true })
            .toFormat('webp', { quality: 80 })
            .toFile(thumbPath);
        }
      } else if (item.ext === 'mp4') {
        if (!fs.existsSync(thumbPath)) {
          const posterTmp = path.join(thumbDir, `${hash}_poster.png`);
          try {
            execSync(
              `"${ffmpegPath}" -y -ss 1 -i "${srcPath}" -vframes 1 -q:v 2 "${posterTmp}"`,
              { stdio: 'pipe' }
            );
            if (fs.existsSync(posterTmp)) {
              await sharp(posterTmp)
                .resize({ width: 800, withoutEnlargement: true })
                .toFormat('webp')
                .toFile(thumbPath);
              fs.unlinkSync(posterTmp);
            }
          } catch (e) {
            // ffmpeg might not be linked — write a placeholder
            console.warn('  [skip video poster]', item.filename, e.message.slice(0, 60));
          }
        }
      }

      if (fs.existsSync(thumbPath)) {
        const lqipBuf = await sharp(thumbPath).resize({ width: 20 }).toBuffer();
        item.thumb = `/images/thumbs/${thumbName}`;
        item.lqip = `data:image/webp;base64,${lqipBuf.toString('base64')}`;
        done++;
        if (done % 20 === 0) process.stdout.write(`  processed ${done}…\r`);
      }
    } catch (err) {
      console.error('  Error processing', item.filename, err.message);
    }
  }

  fs.writeFileSync(mediaPath, JSON.stringify(media, null, 2));
  console.log(`\nDone — ${done} thumbnails generated. media.json updated.`);
})();
