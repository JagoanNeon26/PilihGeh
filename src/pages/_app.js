import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.element.isRequired,
  pageProps: PropTypes.objectOf.isRequired,
};
