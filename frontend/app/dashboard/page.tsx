"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowRight, Calendar, Clock, Trophy } from "lucide-react"

// Adicionar imports necessários para o dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut, Settings, User } from "lucide-react"

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [periodoDados, setPeriodoDados] = useState("mes")

  // Dados simulados para o progresso semanal detalhado
  const progressoDetalhado = {
    total: {
      feitas: 78,
      acertos: 56,
      taxaAcerto: 72,
    },
    materias: [
      {
        nome: "Matemática",
        feitas: 25,
        acertos: 16,
        taxaAcerto: 64,
      },
      {
        nome: "Física",
        feitas: 18,
        acertos: 14,
        taxaAcerto: 78,
      },
      {
        nome: "Química",
        feitas: 15,
        acertos: 12,
        taxaAcerto: 80,
      },
      {
        nome: "Biologia",
        feitas: 20,
        acertos: 14,
        taxaAcerto: 70,
      },
    ],
    diasConsecutivos: 5,
    tempoTotal: "8h 45min",
    mediaDiaria: "1h 45min",
  }

  // Dados simulados para diferentes períodos
  const dadosPorPeriodo = {
    hoje: {
      matematica: 55,
      fisica: 70,
      quimica: 75,
      biologia: 85,
      portugues: 65,
    },
    semana: {
      matematica: 60,
      fisica: 75,
      quimica: 78,
      biologia: 88,
      portugues: 70,
    },
    mes: {
      matematica: 65,
      fisica: 78,
      quimica: 82,
      biologia: 91,
      portugues: 73,
    },
    bimestre: {
      matematica: 68,
      fisica: 80,
      quimica: 85,
      biologia: 92,
      portugues: 75,
    },
    semestre: {
      matematica: 72,
      fisica: 83,
      quimica: 87,
      biologia: 94,
      portugues: 78,
    },
  }

  // Obter dados do período selecionado
  const dadosAtuais = dadosPorPeriodo[periodoDados as keyof typeof dadosPorPeriodo]

  // Mapeamento de valores para textos descritivos
  const textosPeriodos = {
    hoje: "Análise de hoje",
    semana: "Análise da última semana",
    mes: "Análise dos últimos 30 dias",
    bimestre: "Análise dos últimos 2 meses",
    semestre: "Análise dos últimos 6 meses",
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
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary text-primary">
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
            <span className="text-sm font-medium">Olá, Maria</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium cursor-pointer hover:bg-primary/20 transition-colors">
                  M
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/perfil" className="cursor-pointer flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/configuracoes" className="cursor-pointer flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Deseja realmente sair?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Você será desconectado da sua conta. Para continuar estudando, será necessário fazer login
                        novamente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Link href="/login">Sair</Link>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 inline mr-1" />
                05 de Abril, 2025
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Questões para hoje</CardTitle>
                <CardDescription>Baseadas no seu desempenho recente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">15</div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  Tempo estimado: 45 minutos
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/questoes-diarias?materia=matematica&mostrarDiagnostico=true">
                    Iniciar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Progresso semanal</CardTitle>
                <CardDescription>Questões resolvidas: 78/100</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={78} className="h-2 mt-2" />
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Taxa de acerto</div>
                    <div className="font-medium">72%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Dias consecutivos</div>
                    <div className="font-medium">5 dias</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" onClick={() => setIsModalOpen(true)}>
                      Ver detalhes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] h-[90vh] sm:h-auto overflow-auto p-0 sm:p-6">
                    <div className="sticky top-0 bg-background z-10 p-6 pb-2 border-b">
                      <DialogHeader>
                        <DialogTitle>Detalhes do Progresso Semanal</DialogTitle>
                        <DialogDescription>Análise detalhada do seu desempenho nos últimos 7 dias</DialogDescription>
                      </DialogHeader>
                    </div>

                    <div className="space-y-6 p-6 pt-2 overflow-y-auto">
                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium mb-3">Resumo Geral</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Questões resolvidas</p>
                            <p className="text-xl font-medium">{progressoDetalhado.total.feitas}/100</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Taxa de acerto</p>
                            <p className="text-xl font-medium">{progressoDetalhado.total.taxaAcerto}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Dias consecutivos</p>
                            <p className="text-xl font-medium">{progressoDetalhado.diasConsecutivos} dias</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Tempo total de estudo</p>
                            <p className="text-xl font-medium">{progressoDetalhado.tempoTotal}</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium mb-3">Desempenho por Matéria</h3>
                        <div className="space-y-4">
                          {progressoDetalhado.materias.map((materia) => (
                            <div key={materia.nome}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="text-sm font-medium">{materia.nome}</div>
                                <div className="text-sm text-muted-foreground">{materia.taxaAcerto}%</div>
                              </div>
                              <Progress value={materia.taxaAcerto} className="h-2" />
                              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                                <span>Questões: {materia.feitas}</span>
                                <span>Acertos: {materia.acertos}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="text-lg font-medium mb-2">Recomendações</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-medium">•</span>
                            <span>Foque em Matemática para melhorar sua taxa de acerto.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-medium">•</span>
                            <span>Continue com o ritmo atual de estudos em Química.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-medium">•</span>
                            <span>Tente aumentar o tempo diário de estudo para 2 horas.</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="sticky bottom-0 bg-background z-10 p-6 pt-2 border-t flex justify-end">
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Fechar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Desafio da semana</CardTitle>
                <CardDescription>Termina em 2 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <div className="font-medium">Acerte 10 questões de Matemática</div>
                </div>
                <Progress value={70} className="h-2 mt-4" />
                <div className="mt-2 text-sm text-right text-muted-foreground">7/10 concluídas</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Continuar desafio
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="desempenho">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
              <TabsTrigger value="materias">Matérias</TabsTrigger>
              <TabsTrigger value="recomendacoes">Recomendações</TabsTrigger>
            </TabsList>
            <TabsContent value="desempenho" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Desempenho por área</CardTitle>
                    <CardDescription className="mt-1">
                      {textosPeriodos[periodoDados as keyof typeof textosPeriodos]}
                    </CardDescription>
                  </div>
                  <Select value={periodoDados} onValueChange={setPeriodoDados}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoje">Hoje</SelectItem>
                      <SelectItem value="semana">Última semana</SelectItem>
                      <SelectItem value="mes">Último mês</SelectItem>
                      <SelectItem value="bimestre">Último bimestre</SelectItem>
                      <SelectItem value="semestre">Último semestre</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Matemática</div>
                        <div className="text-sm text-muted-foreground">{dadosAtuais.matematica}%</div>
                      </div>
                      <Progress value={dadosAtuais.matematica} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Física</div>
                        <div className="text-sm text-muted-foreground">{dadosAtuais.fisica}%</div>
                      </div>
                      <Progress value={dadosAtuais.fisica} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Química</div>
                        <div className="text-sm text-muted-foreground">{dadosAtuais.quimica}%</div>
                      </div>
                      <Progress value={dadosAtuais.quimica} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Biologia</div>
                        <div className="text-sm text-muted-foreground">{dadosAtuais.biologia}%</div>
                      </div>
                      <Progress value={dadosAtuais.biologia} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">Português</div>
                        <div className="text-sm text-muted-foreground">{dadosAtuais.portugues}%</div>
                      </div>
                      <Progress value={dadosAtuais.portugues} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver relatório completo
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="materias" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de questões</CardTitle>
                  <CardDescription>Baseada nas suas necessidades de aprendizado</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Matemática</CardTitle>
                        <CardDescription>Foco recomendado: Alto</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <p>Tópicos para revisar:</p>
                          <ul className="list-disc pl-4 mt-1">
                            <li>Geometria Analítica</li>
                            <li>Trigonometria</li>
                            <li>Funções Exponenciais</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Física</CardTitle>
                        <CardDescription>Foco recomendado: Médio</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <p>Tópicos para revisar:</p>
                          <ul className="list-disc pl-4 mt-1">
                            <li>Eletromagnetismo</li>
                            <li>Mecânica</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver todas as matérias
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="recomendacoes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recomendações personalizadas</CardTitle>
                  <CardDescription>Baseadas no seu padrão de erros e acertos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="font-medium">Revisar conceitos de Geometria Analítica</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Você teve dificuldade em questões sobre distância entre ponto e reta.
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="font-medium">Praticar mais questões de Bioquímica</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Seu desempenho melhorou 15% neste tópico na última semana.
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="font-medium">Focar em interpretação de textos científicos</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Este é um tema recorrente nos últimos vestibulares de medicina.
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Gerar plano de estudos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Depoimentos de quem usa o Destravai</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      A
                    </div>
                    <div>
                      <div className="font-medium">Ana Silva</div>
                      <div className="text-sm text-muted-foreground">Estudante de Medicina</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Aumentei minha nota em biologia de 6 para 8,5 em 2 meses. O sistema de revisão espaçada é incrível!"
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      L
                    </div>
                    <div>
                      <div className="font-medium">Lucas Oliveira</div>
                      <div className="text-sm text-muted-foreground">Vestibulando</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Consegui identificar meus pontos fracos em matemática e melhorar 30% no simulado da Fuvest."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      G
                    </div>
                    <div>
                      <div className="font-medium">Gabriel Santos</div>
                      <div className="text-sm text-muted-foreground">Estudante de Ensino Médio</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Minha média em física subiu de 5,8 para 7,2. As questões personalizadas fazem toda diferença."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      M
                    </div>
                    <div>
                      <div className="font-medium">Mariana Costa</div>
                      <div className="text-sm text-muted-foreground">Estudante do ENEM</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Passei a estudar 2h por dia com foco total. O sistema de metas diárias me mantém motivada."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      P
                    </div>
                    <div>
                      <div className="font-medium">Pedro Almeida</div>
                      <div className="text-sm text-muted-foreground">Estudante de Engenharia</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Melhorei minha organização e agora consigo revisar todas as matérias semanalmente."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
