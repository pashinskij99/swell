import Head from 'next/head';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import '../styles/variables.scss';
import { Leva } from 'leva';
import Layout from '../components/layout';
import styles from './styles.module.scss';

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   addCursor()
  //   // addScroll()
  // }, [])
  return (
    <Layout>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default MyApp;
