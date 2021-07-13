import "bootstrap/dist/css/bootstrap.min.css"
import "weather-icons/css/weather-icons.css"
import "../styles/form.css"
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title>Weather App</title>
            <meta name="description" content="This is a weather app"/>
        </Head>
        <Component {...pageProps} />
      </>

  )
}

export default MyApp
