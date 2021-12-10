import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
  <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black px-4 flex flex-col justify-between">
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp
