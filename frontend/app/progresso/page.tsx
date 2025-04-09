"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUp, TrendingUp } from "lucide-react"
import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, ResponsiveContainer } from "recharts"
import { CheckCircle } from "lucide-react"

export default function Progresso() {
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
            <Link href="/progresso" className="text-sm font-medium transition-colors hover:text-primary text-primary">
              Progresso
            </Link>
            <Link href="/desafios" className="text-sm font-medium transition-colors hover:text-primary">
              Desafios
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Olá, Maria</span>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              M
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Seu Progresso</h1>
              <p className="text-sm text-muted-foreground">Acompanhe sua evolução ao longo do tempo</p>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="30dias">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                  <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                  <SelectItem value="90dias">Últimos 90 dias</SelectItem>
                  <SelectItem value="todos">Todo o período</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total de questões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.248</div>
                <div className="mt-1 flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>12% a mais que o período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de acerto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76%</div>
                <div className="mt-1 flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>5% a mais que o período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Dias de estudo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24/30</div>
                <div className="mt-1 flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>3 dias a mais que o período anterior</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Tempo médio diário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1h 24min</div>
                <div className="mt-1 flex items-center text-xs text-green-500">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  <span>12min a mais que o período anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="desempenho">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
              <TabsTrigger value="materias">Por Matéria</TabsTrigger>
              <TabsTrigger value="evolucao">Evolução</TabsTrigger>
            </TabsList>
            <TabsContent value="desempenho" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho por semana</CardTitle>
                  <CardDescription>Visualize sua evolução nas últimas semanas</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    <Card className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <h3 className="text-lg font-medium">Desempenho em Matemática</h3>
                        <p className="text-sm text-muted-foreground">Taxa de acerto e volume de questões por semana</p>
                      </CardHeader>
                      <CardContent className="p-0 overflow-hidden">
                        <div className="h-[220px] w-full px-2">
                          <ResponsiveContainer>
                            <BarChart
                              data={[
                                { semana: "Sem 1", acertos: 62, questoes: 25 },
                                { semana: "Sem 2", acertos: 58, questoes: 30 },
                                { semana: "Sem 3", acertos: 65, questoes: 35 },
                                { semana: "Sem 4", acertos: 70, questoes: 40 },
                                { semana: "Sem 5", acertos: 68, questoes: 38 },
                                { semana: "Sem 6", acertos: 75, questoes: 42 },
                              ]}
                              margin={{ top: 5, right: 25, left: 5, bottom: 20 }}
                              barSize={20}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis
                                dataKey="semana"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={5}
                                height={20}
                                tick={{ fontSize: 11 }}
                              />
                              <YAxis
                                yAxisId="left"
                                orientation="left"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                                width={30}
                                tick={{ fontSize: 11 }}
                              />
                              <YAxis
                                yAxisId="right"
                                orientation="right"
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                                width={25}
                                tick={{ fontSize: 11 }}
                              />
                              <Tooltip />
                              <Legend wrapperStyle={{ paddingTop: "5px", fontSize: "11px" }} height={20} iconSize={8} />
                              <Bar dataKey="acertos" yAxisId="left" fill="hsl(var(--chart-1))" radius={[3, 3, 0, 0]} />
                              <Bar
                                dataKey="questoes"
                                yAxisId="right"
                                fill="hsl(var(--chart-2))"
                                radius={[3, 3, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <h3 className="text-lg font-medium">Desempenho por Tópico em Matemática</h3>
                        <p className="text-sm text-muted-foreground">
                          Evolução da taxa de acerto por tópico ao longo do tempo
                        </p>
                      </CardHeader>
                      <CardContent className="p-0 overflow-hidden">
                        <div className="h-[220px] w-full px-2">
                          <ResponsiveContainer>
                            <LineChart
                              data={[
                                {
                                  semana: "Sem 1",
                                  "Geometria Analítica": 45,
                                  Trigonometria: 50,
                                  "Funções Exponenciais": 60,
                                  "Geometria Plana": 70,
                                },
                                {
                                  semana: "Sem 2",
                                  "Geometria Analítica": 48,
                                  Trigonometria: 52,
                                  "Funções Exponenciais": 58,
                                  "Geometria Plana": 75,
                                },
                                {
                                  semana: "Sem 3",
                                  "Geometria Analítica": 52,
                                  Trigonometria: 55,
                                  "Funções Exponenciais": 62,
                                  "Geometria Plana": 78,
                                },
                                {
                                  semana: "Sem 4",
                                  "Geometria Analítica": 55,
                                  Trigonometria: 60,
                                  "Funções Exponenciais": 65,
                                  "Geometria Plana": 80,
                                },
                                {
                                  semana: "Sem 5",
                                  "Geometria Analítica": 58,
                                  Trigonometria: 63,
                                  "Funções Exponenciais": 68,
                                  "Geometria Plana": 82,
                                },
                                {
                                  semana: "Sem 6",
                                  "Geometria Analítica": 62,
                                  Trigonometria: 65,
                                  "Funções Exponenciais": 70,
                                  "Geometria Plana": 85,
                                },
                              ]}
                              margin={{ top: 5, right: 25, left: 5, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis
                                dataKey="semana"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={5}
                                height={20}
                                tick={{ fontSize: 11 }}
                              />
                              <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                                width={30}
                                tick={{ fontSize: 11 }}
                                domain={[40, 90]}
                                ticks={[40, 50, 60, 70, 80, 90]}
                              />
                              <Tooltip />
                              <Legend wrapperStyle={{ paddingTop: "5px", fontSize: "11px" }} height={20} iconSize={8} />
                              <Line
                                type="monotone"
                                dataKey="Geometria Analítica"
                                stroke="hsl(var(--chart-1))"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="Trigonometria"
                                stroke="hsl(var(--chart-2))"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="Funções Exponenciais"
                                stroke="hsl(var(--chart-3))"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="Geometria Plana"
                                stroke="hsl(var(--chart-4))"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border shadow-sm">
                      <CardHeader className="pb-2">
                        <h3 className="text-lg font-medium">Recomendações Baseadas no Desempenho</h3>
                        <p className="text-sm text-muted-foreground">
                          Sugestões personalizadas para melhorar seu aprendizado
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 rounded-lg border">
                            <div className="mt-0.5 bg-red-100 p-1 rounded-full">
                              <TrendingUp className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium">Prioridade Alta: Geometria Analítica</div>
                              <div className="text-sm text-muted-foreground">
                                Seu desempenho está melhorando, mas ainda está abaixo da média. Recomendamos focar em
                                exercícios sobre distância entre ponto e reta e equações de circunferências.
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg border">
                            <div className="mt-0.5 bg-amber-100 p-1 rounded-full">
                              <TrendingUp className="h-4 w-4 text-amber-600" />
                            </div>
                            <div>
                              <div className="font-medium">Prioridade Média: Trigonometria</div>
                              <div className="text-sm text-muted-foreground">
                                Você está progredindo bem, mas ainda há espaço para melhoria. Foque em relações
                                trigonométricas no triângulo retângulo e ciclo trigonométrico.
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg border">
                            <div className="mt-0.5 bg-green-100 p-1 rounded-full">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium">Manter Prática: Geometria Plana</div>
                              <div className="text-sm text-muted-foreground">
                                Seu desempenho está excelente! Continue praticando para manter o conhecimento e
                                aprofundar em tópicos mais avançados.
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="materias" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho por matéria</CardTitle>
                  <CardDescription>Compare seu desempenho entre as diferentes disciplinas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Matemática</div>
                          <div className="text-xs text-muted-foreground">352 questões respondidas</div>
                        </div>
                        <div className="text-sm font-medium">65%</div>
                      </div>
                      <Progress value={65} className="h-2" />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                          <span>+8% no último mês</span>
                        </div>
                        <div>Média geral: 62%</div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Física</div>
                          <div className="text-xs text-muted-foreground">287 questões respondidas</div>
                        </div>
                        <div className="text-sm font-medium">78%</div>
                      </div>
                      <Progress value={78} className="h-2" />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                          <span>+5% no último mês</span>
                        </div>
                        <div>Média geral: 70%</div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Química</div>
                          <div className="text-xs text-muted-foreground">312 questões respondidas</div>
                        </div>
                        <div className="text-sm font-medium">82%</div>
                      </div>
                      <Progress value={82} className="h-2" />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                          <span>+3% no último mês</span>
                        </div>
                        <div>Média geral: 75%</div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Biologia</div>
                          <div className="text-xs text-muted-foreground">389 questões respondidas</div>
                        </div>
                        <div className="text-sm font-medium">91%</div>
                      </div>
                      <Progress value={91} className="h-2" />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                          <span>+2% no último mês</span>
                        </div>
                        <div>Média geral: 85%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="evolucao" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Evolução por tópico</CardTitle>
                  <CardDescription>Acompanhe seu progresso nos tópicos que você mais precisa melhorar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-medium">Geometria Analítica</div>
                        <div className="text-sm">
                          <span className="font-medium text-green-500">+18%</span>
                          <span className="text-muted-foreground"> de melhoria</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Antes: 48%</div>
                        <Progress value={48} className="h-2 flex-1" />
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Agora: 66%</div>
                        <Progress value={66} className="h-2 flex-1" />
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-medium">Bioquímica</div>
                        <div className="text-sm">
                          <span className="font-medium text-green-500">+15%</span>
                          <span className="text-muted-foreground"> de melhoria</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Antes: 62%</div>
                        <Progress value={62} className="h-2 flex-1" />
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Agora: 77%</div>
                        <Progress value={77} className="h-2 flex-1" />
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-medium">Mecânica</div>
                        <div className="text-sm">
                          <span className="font-medium text-green-500">+12%</span>
                          <span className="text-muted-foreground"> de melhoria</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Antes: 70%</div>
                        <Progress value={70} className="h-2 flex-1" />
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Agora: 82%</div>
                        <Progress value={82} className="h-2 flex-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Ver todos os tópicos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

