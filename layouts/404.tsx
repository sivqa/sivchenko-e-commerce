import Head from 'next/head';
import Header from 'components/header';
import { useRouter } from 'next/router';

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
}

export default ({ children, title = 'Next.js Ecommerce' }: LayoutType) => {
  const router = useRouter();

  return (
    <div className="app-main">
      <Head>
        <title>Page not found &mdash; { title }</title>
      </Head>

      <Header isErrorPage />

      <main>
        { children }
      </main>
    </div>
  )
}