"use client";
import { Header, Footer } from '@/components/layouts';

export default function SoundsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const openAuthModal = () => {
    console.log('Open auth modal');
  };

  return (

    <div className='flex flex-col min-h-screen'>
      <header>
        <Header openAuthModal={openAuthModal}/>
      </header>
      <main className='flex-grow'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
