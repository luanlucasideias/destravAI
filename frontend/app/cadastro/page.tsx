"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Building, Mail } from "lucide-react"

export default function CadastroPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Estado para o formulário de email/senha
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  // Estado para o formulário de código de instituição
  const [codigoInstituicao, setCodigoInstituicao] = useState("")
  const [emailInstitucional, setEmailInstitucional] = useState("")

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem")
      return
    }

    setIsLoading(true)

    // Simulação de cadastro - aqui você implementaria a lógica real
    setTimeout(() => {
      setIsLoading(false)
      // Redirecionar para o dashboard após cadastro bem-sucedido
      window.location.href = "/dashboard"
    }, 1500)
  }

  const handleSubmitInstituicao = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de verificação do código da instituição
    setTimeout(() => {
      setIsLoading(false)
      // Redirecionar para o dashboard após cadastro bem-sucedido
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link href="/" className="text-primary">
              Destrav.ai
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
            <CardDescription>Escolha como deseja se cadastrar na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Button variant="outline" className="w-full" type="button">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Cadastrar com Google
              </Button>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Ou cadastre-se com</span>
              </div>
            </div>

            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="instituicao" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Instituição
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleSubmitEmail} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Seu nome completo"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senha">Senha</Label>
                    <Input
                      id="senha"
                      type="password"
                      placeholder="Crie uma senha forte"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmar-senha">Confirmar senha</Label>
                    <Input
                      id="confirmar-senha"
                      type="password"
                      placeholder="Digite a senha novamente"
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Cadastrando..." : "Criar conta"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="instituicao">
                <form onSubmit={handleSubmitInstituicao} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="codigo-instituicao">Código da instituição</Label>
                    <Input
                      id="codigo-instituicao"
                      type="text"
                      placeholder="Ex: MEDUNIV2023"
                      value={codigoInstituicao}
                      onChange={(e) => setCodigoInstituicao(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-institucional">Email institucional</Label>
                    <Input
                      id="email-institucional"
                      type="email"
                      placeholder="seu@universidade.edu.br"
                      value={emailInstitucional}
                      onChange={(e) => setEmailInstitucional(e.target.value)}
                      required
                    />
                  </div>
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <p>
                      Ao usar o código da instituição, você terá acesso a recursos exclusivos disponibilizados pela sua
                      escola ou universidade.
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Verificando..." : "Verificar e cadastrar"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center space-y-2">
            <div className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}


