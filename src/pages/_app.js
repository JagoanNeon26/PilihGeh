import 'bootstrap/dist/css/bootstrap.min.css';
import '@sweetalert2/theme-dark/dark.css';
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { SSRProvider } from 'react-bootstrap';

require('dotenv').config();

function MyApp({ Component, pageProps }) {
  config.autoAddCss = false;
  return (
    <>
      <Head>
        <title>PilihGeh</title>
        <meta name="title" content="PilihGeh" />
        <meta name="description" content="Website for your voting need" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SSRProvider>
        <Component {...pageProps} />;
      </SSRProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default MyApp;
