import 'tailwindcss/tailwind.css'
import '../style/global.css'
import Head from 'next/head'

import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
  <div 
    style={{backgroundImage: 'url(/8.svg)'}}
    className="relative flex flex-col md:flex-row md:pl-20 gap-8 max-h-screen min-h-screen overflow-hidden text-lg bg-no-repeat bg-cover bg-center">
    <Head>
      <title>Portal</title>
    </Head>
    <Header />
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp