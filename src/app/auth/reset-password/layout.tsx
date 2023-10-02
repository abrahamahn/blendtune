import { Header, Footer } from '@/components/layouts';

export default function ResetPasswordtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col min-h-screen'>
      <nav>
        <Header />
      </nav>
      <main className='flex-grow'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
}
