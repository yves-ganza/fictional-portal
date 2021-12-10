import 'tailwindcss/tailwind.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
  <div 
    style={{backgroundImage: 'url(/8.svg)'}}
    className="min-h-screen text-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black px-4 flex flex-col justify-between bg-no-repeat bg-cover bg-center">
    <Head>
      <title>Portal</title>
    </Head>
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp