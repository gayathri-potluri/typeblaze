import { Hero } from '@/components/custom/Hero'

import { ThemeProvider } from '@/components/theme-providers'

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <main className=" ">
        <Hero />    
      </main>
    </ThemeProvider>
  )
}