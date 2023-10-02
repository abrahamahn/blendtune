import { Header, Footer } from '@/components/layouts';

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Header />
      </header>
      <main className='flex-grow'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
