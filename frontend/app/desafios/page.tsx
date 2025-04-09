"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Medal, Star, Trophy } from "lucide-react"
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

export default function Desafios() {
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
            <Link href="/desafios" className="text-sm font-medium transition-colors hover:text-primary text-primary">
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
            <div>
              <h1 className="text-3xl font-bold">Desafios</h1>
              <p className="text-sm text-muted-foreground">Mantenha-se motivado com metas e recompensas</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                <Trophy className="h-4 w-4" />
                <span>1.250 pontos</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="ativos">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="ativos">Ativos</TabsTrigger>
              <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
              <TabsTrigger value="conquistas">Conquistas</TabsTrigger>
            </TabsList>
            <TabsContent value="ativos" className="mt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Desafio da Semana
                      </Badge>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>2 dias restantes</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Maratona de Matemática</CardTitle>
                    <CardDescription>Acerte 10 questões de Matemática com dificuldade média ou alta</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={70} className="h-2" />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">7/10 concluídas</span>
                      <span className="font-medium">+150 pontos</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continuar desafio</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        Desafio Diário
                      </Badge>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>12 horas restantes</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Revisão Rápida</CardTitle>
                    <CardDescription>Responda 5 questões de revisão em menos de 15 minutos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={0} className="h-2" />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">0/5 concluídas</span>
                      <span className="font-medium">+50 pontos</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Iniciar desafio</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Desafio Mensal
                      </Badge>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>18 dias restantes</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Especialista em Biologia</CardTitle>
                    <CardDescription>Alcance 85% de acerto em 50 questões de Biologia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={32} className="h-2" />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">16/50 concluídas (81% de acerto)</span>
                      <span className="font-medium">+300 pontos</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Continuar desafio</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                        Desafio de Consistência
                      </Badge>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>Contínuo</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Sequência Perfeita</CardTitle>
                    <CardDescription>Estude por 7 dias consecutivos, pelo menos 30 minutos por dia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={71} className="h-2" />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">5/7 dias consecutivos</span>
                      <span className="font-medium">+100 pontos</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Ver detalhes</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="concluidos" className="mt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        Concluído
                      </Badge>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>28/03/2025</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Física em Foco</CardTitle>
                    <CardDescription>Acerte 15 questões de Física em um único dia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={100} className="h-2" />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">15/15 concluídas</span>
                      <span className="font-medium text-green-600">+200 pontos ganhos</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver detalhes
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        Concluído
                      </Badge>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>15/03/2025</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">Maratona de Química</CardTitle>
                    <CardDescription>Responda 30 questões de Química em uma semana</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={100} className="h-2" />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">30/30 concluídas</span>
                      <span className="font-medium text-green-600">+250 pontos ganhos</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver detalhes
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="conquistas" className="mt-4">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                      <Medal className="h-6 w-6 text-yellow-700" />
                    </div>
                    <CardTitle className="text-base">Estudante Dedicado</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-muted-foreground">
                    <p>Completou 30 dias de estudo</p>
                    <div className="mt-2 font-medium text-foreground">Conquistado em 20/03/2025</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <Star className="h-6 w-6 text-blue-700" />
                    </div>
                    <CardTitle className="text-base">Mestre em Biologia</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-muted-foreground">
                    <p>Atingiu 90% de acerto em Biologia</p>
                    <div className="mt-2 font-medium text-foreground">Conquistado em 15/03/2025</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <Trophy className="h-6 w-6 text-green-700" />
                    </div>
                    <CardTitle className="text-base">Maratonista</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-muted-foreground">
                    <p>Respondeu 100 questões em uma semana</p>
                    <div className="mt-2 font-medium text-foreground">Conquistado em 10/03/2025</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}