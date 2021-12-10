import 'tailwindcss/tailwind.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
  <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black px-4 flex flex-col justify-between">
    <Head>
      <title>Portal</title>
    </Head>
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp
