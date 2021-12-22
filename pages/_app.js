import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import EmptyLayout from "../components/layouts/empty";
import "emoji-mart/css/emoji-mart.css";
import { store } from "../app/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.Layout ?? EmptyLayout;
  
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
