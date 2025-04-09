"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ConfiguracoesPage() {
  const [materias, setMaterias] = useState([
    { id: 1, nome: "Matemática", quantidade: 5, ativo: true },
    { id: 2, nome: "Física", quantidade: 3, ativo: true },
    { id: 3, nome: "Química", quantidade: 4, ativo: true },
    { id: 4, nome: "Biologia", quantidade: 5, ativo: true },
    { id: 5, nome: "Português", quantidade: 3, ativo: true },
    { id: 6, nome: "História", quantidade: 2, ativo: false },
    { id: 7, nome: "Geografia", quantidade: 2, ativo: false },
    { id: 8, nome: "Inglês", quantidade: 2, ativo: false },
  ])

  const [notificacoes, setNotificacoes] = useState({
    lembretesDiarios: true,
    atualizacoesDesempenho: true,
    novosDesafios: true,
    dicas: false,
  })

  const handleQuantidadeChange = (id: number, value: number[]) => {
    setMaterias((prev) => prev.map((materia) => (materia.id === id ? { ...materia, quantidade: value[0] } : materia)))
  }

  const handleAtivoChange = (id: number, checked: boolean) => {
    setMaterias((prev) => prev.map((materia) => (materia.id === id ? { ...materia, ativo: checked } : materia)))
  }

  const handleNotificacaoChange = (key: keyof typeof notificacoes, checked: boolean) => {
    setNotificacoes((prev) => ({ ...prev, [key]: checked }))
  }

  const salvarConfiguracoes = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    alert("Configurações salvas com sucesso!")
  }

  const totalQuestoesDiarias = materias.reduce(
    (total, materia) => (materia.ativo ? total + materia.quantidade : total),
    0,
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link href="/" className="text-primary">
              Destrav.ai
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link href="/questoes-diarias" className="text-sm font-medium transition-colors hover:text-primary">
              Questões Diárias
            </Link>
            <Link href="/progresso" className="text-sm font-medium transition-colors hover:text-primary">
              Progresso
            </Link>
            <Link href="/desafios" className="text-sm font-medium transition-colors hover:text-primary">
              Desafios
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Configurações</h1>
            <Button onClick={salvarConfiguracoes} className="gap-2">
              <Save className="h-4 w-4" />
              Salvar alterações
            </Button>
          </div>

          <Tabs defaultValue="questoes">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="questoes">Questões Diárias</TabsTrigger>
              <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
            </TabsList>
            <TabsContent value="questoes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Questões Diárias</CardTitle>
                  <CardDescription>
                    Defina a quantidade de questões que deseja receber diariamente para cada matéria
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4 bg-muted/30">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total de questões diárias:</span>
                        <span className="text-lg font-bold">{totalQuestoesDiarias}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Recomendamos entre 10 e 20 questões por dia para um estudo eficiente.
                      </div>
                    </div>

                    <div className="space-y-6">
                      {materias.map((materia) => (
                        <div key={materia.id} className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`materia-${materia.id}`} className="flex items-center gap-2">
                              <Switch
                                id={`materia-${materia.id}-switch`}
                                checked={materia.ativo}
                                onCheckedChange={(checked) => handleAtivoChange(materia.id, checked)}
                              />
                              {materia.nome}
                            </Label>
                            <span className="font-medium">{materia.quantidade}</span>
                          </div>
                          <Slider
                            id={`materia-${materia.id}`}
                            disabled={!materia.ativo}
                            min={1}
                            max={10}
                            step={1}
                            value={[materia.quantidade]}
                            onValueChange={(value) => handleQuantidadeChange(materia.id, value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={salvarConfiguracoes}>Salvar configurações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notificacoes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Notificações</CardTitle>
                  <CardDescription>Escolha quais notificações deseja receber</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="lembretes" className="flex flex-col gap-1">
                        <span>Lembretes diários</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receba lembretes para estudar todos os dias
                        </span>
                      </Label>
                      <Switch
                        id="lembretes"
                        checked={notificacoes.lembretesDiarios}
                        onCheckedChange={(checked) => handleNotificacaoChange("lembretesDiarios", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="desempenho" className="flex flex-col gap-1">
                        <span>Atualizações de desempenho</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receba atualizações semanais sobre seu desempenho
                        </span>
                      </Label>
                      <Switch
                        id="desempenho"
                        checked={notificacoes.atualizacoesDesempenho}
                        onCheckedChange={(checked) => handleNotificacaoChange("atualizacoesDesempenho", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="desafios" className="flex flex-col gap-1">
                        <span>Novos desafios</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Seja notificado quando novos desafios estiverem disponíveis
                        </span>
                      </Label>
                      <Switch
                        id="desafios"
                        checked={notificacoes.novosDesafios}
                        onCheckedChange={(checked) => handleNotificacaoChange("novosDesafios", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="dicas" className="flex flex-col gap-1">
                        <span>Dicas de estudo</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Receba dicas e estratégias para melhorar seus estudos
                        </span>
                      </Label>
                      <Switch
                        id="dicas"
                        checked={notificacoes.dicas}
                        onCheckedChange={(checked) => handleNotificacaoChange("dicas", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={salvarConfiguracoes}>Salvar configurações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
