"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, LineChart, Target } from "lucide-react"
import { motion } from "framer-motion"

export default function HomeClientSection() {
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
            <img src="/assets/logo_destravai.png" alt="Logo Destrav.ai" className="h-10 w-auto" />
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
                    Estude de forma inteligente
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
                src="/home_dashboard.jpg"
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  O que nossos alunos dizem
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Veja como o Destrav.ai está transformando a forma de estudar para o vestibular
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[{
                nome: "Ana Silva",
                tipo: "Estudante de Medicina",
                inicial: "A",
                depoimento: "Aumentei minha nota em biologia de 6 para 8,5 em 2 meses. O sistema de revisão espaçada é incrível!"
              }, {
                nome: "Lucas Oliveira",
                tipo: "Vestibulando",
                inicial: "L",
                depoimento: "Consegui identificar meus pontos fracos em matemática e melhorar 30% no simulado da Fuvest."
              }, {
                nome: "Gabriel Santos",
                tipo: "Estudante de Ensino Médio",
                inicial: "G",
                depoimento: "Minha média em física subiu de 5,8 para 7,2. As questões personalizadas fazem toda diferença."
              }, {
                nome: "Mariana Costa",
                tipo: "Estudante do ENEM",
                inicial: "M",
                depoimento: "Passei a estudar 2h por dia com foco total. O sistema de metas diárias me mantém motivada."
              }, {
                nome: "Pedro Almeida",
                tipo: "Estudante de Engenharia",
                inicial: "P",
                depoimento: "Melhorei minha organização e agora consigo revisar todas as matérias semanalmente."
              }, {
                nome: "Juliana Martins",
                tipo: "Estudante de Odontologia",
                inicial: "J",
                depoimento: "Com o Destrav.ai, consegui manter a disciplina nos estudos e subir minha nota em química de 7 para 8,9."
              }].map((item, idx) => (
                <motion.div
                  key={item.nome}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80,80,120,0.10)' }}
                  style={{ willChange: 'transform, box-shadow' }}
                >
                  <Card className="border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {item.inicial}
                        </div>
                        <div>
                          <div className="font-medium">{item.nome}</div>
                          <div className="text-sm text-muted-foreground">{item.tipo}</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        "{item.depoimento}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 