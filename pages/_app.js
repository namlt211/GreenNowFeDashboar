import { ThemeProvider } from "styled-components";
import Layout1 from "../layout/layout2";
import Layout from "../layout";
import "../styles/globals.css";
import "../assets/fontawesome/css/all.css";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
const theme = {
  colors: {
    primary: "#0070f3",
  },
};
function MyApp({ Component, pageProps }) {
  // Cookies.remove("user");
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(Cookies.get("user"));
  }, [Cookies.get("user")]);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>Green Now</title>
        </Head>
        {user !== undefined ? (
          <Layout1>
            <Component {...pageProps} />
          </Layout1>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
