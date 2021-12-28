import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import EmptyLayout from "../components/layouts/empty";
import "emoji-mart/css/emoji-mart.css";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import NProgress from "nprogress";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.Layout ?? EmptyLayout;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  NProgress.configure({ parent: '#parent', showSpinner: false });

  router.events?.on("routeChangeStart", () => {
    NProgress.start();
    setLoading(true);
  });

  router.events?.on("routeChangeComplete", () => {
    NProgress.done();
    setLoading(false);
  });

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          {!loading && <Component {...pageProps} />}
          <ToastContainer />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
