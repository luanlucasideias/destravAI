"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, LineChart, Target } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Simula verificação de autenticação ao carregar a página
  useEffect(() => {
    // Em um cenário real, você verificaria um token ou cookie de autenticação
    const checkAuth = () => {
      // Simulando que o usuário não está logado
      setIsLoggedIn(false)
    }

    checkAuth()
  }, [])

  // Função para verificar autenticação antes de navegar
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()

    if (isLoggedIn) {
      router.push(path)
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Destrav.ai</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#"
              onClick={(e) => handleNavigation(e, "/dashboard")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </a>
            <a
              href="#"
              onClick={(e) => handleNavigation(e, "/questoes-diarias")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Questões Diárias
            </a>
            <a
              href="#"
              onClick={(e) => handleNavigation(e, "/progresso")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Progresso
            </a>
            <a
              href="#"
              onClick={(e) => handleNavigation(e, "/desafios")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Desafios
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/cadastro">Cadastrar</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Estude de forma inteligente para o vestibular de Medicina
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    O Destrav.ai analisa seu desempenho e cria listas personalizadas de questões focadas exatamente no
                    que você precisa melhorar.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="px-8"
                    onClick={(e) => {
                      e.preventDefault()
                      if (isLoggedIn) {
                        router.push("/dashboard")
                      } else {
                        router.push("/login")
                      }
                    }}
                  >
                    Começar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Saiba mais
                  </Button>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Dashboard do Destrav.ai mostrando análise de desempenho"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Como o Destrav.ai funciona
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nossa plataforma utiliza inteligência artificial para identificar suas dificuldades e criar um plano
                  de estudos personalizado.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-primary/20">
                <CardHeader className="pb-2">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Questões Personalizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Receba diariamente questões selecionadas com base nos seus erros e acertos anteriores.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardHeader className="pb-2">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Análise de Progresso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Visualize seu desempenho em diferentes matérias e identifique áreas que precisam de mais atenção.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20">
                <CardHeader className="pb-2">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Desafios Semanais</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Mantenha-se motivado com pequenos desafios e metas baseados no seu desempenho.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
