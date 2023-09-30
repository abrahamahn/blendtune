import { Header, Footer } from '@/components/layouts';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <section>
        <nav>
          <Header />
        </nav>
      </section>
      <section>
        <main>{children}</main>
      </section>
      <section>
        <nav>
          <Footer />
        </nav>
      </section>
    </section>
  );
}
