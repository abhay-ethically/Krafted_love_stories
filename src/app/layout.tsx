import '../styles/globals.css';

export const metadata = {
  title: 'Krafted_Love Stories | Akshay Takawane | Wedding Photographer Pune',
  description: 'Boutique luxury wedding and portrait photography agency based in Pune, covering destination weddings all over India. Led by Akshay Takawane with 10+ years of experience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased selection:bg-[#c8a97e] selection:text-black">
        {children}
      </body>
    </html>
  );
}
