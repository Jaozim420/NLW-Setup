import { Header } from '@/components/Header'
import { SummaryTable } from '@/components/SummaryTable'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  return (
    <div className="sm:w-screen lg:h-screen flex justify-center items-center">
      <Head>
        <title>Nlw Setup</title>
      </Head>
      <div className="lg:w-full max-w-5xl px-6 flex flex-col lg:gap-16">
        <Header />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
          }}
        />
        <SummaryTable />
      </div>
    </div>
  )
}
