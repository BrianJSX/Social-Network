import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import EmptyLayout from "../components/layouts/empty";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
