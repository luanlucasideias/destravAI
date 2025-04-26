import type { Metadata } from "next"
import HomeClientSection from "@/components/HomeClientSection"

export const metadata: Metadata = {
  title: "Estude de forma inteligente",
}

export default function Home() {
  return <HomeClientSection />
}
