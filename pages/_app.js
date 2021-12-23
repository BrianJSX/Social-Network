import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import EmptyLayout from "../components/layouts/empty";
import "emoji-mart/css/emoji-mart.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../app/store";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.Layout ?? EmptyLayout;
  
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
