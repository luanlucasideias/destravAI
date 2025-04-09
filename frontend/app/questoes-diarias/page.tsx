"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, Clock, HelpCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { FileDown, FileText, CheckCircle2, XCircle } from "lucide-react"

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

function GabaritoView() {
  const [respostas, setRespostas] = useState<Record<number, string>>({})
  const [mostrarCorrecao, setMostrarCorrecao] = useState(false)

  // Simulação de gabarito correto
  const gabaritoCorreto: Record<number, string> = {
    1: "b",
    2: "a",
    3: "c",
    4: "e",
    5: "d",
    6: "b",
    7: "a",
    8: "c",
    9: "d",
    10: "e",
    11: "a",
    12: "b",
    13: "c",
    14: "d",
    15: "e",
  }

  const handleRespostaChange = (questao: number, alternativa: string) => {
    setRespostas((prev) => ({
      ...prev,
      [questao]: alternativa,
    }))
  }

  const todasRespostasPreenchidas = Object.keys(respostas).length === 15

  const verificarRespostas = () => {
    if (todasRespostasPreenchidas) {
      setMostrarCorrecao(true)
    } else {
      alert("Por favor, responda todas as questões antes de concluir.")
    }
  }

  const calcularAcertos = () => {
    let acertos = 0
    Object.entries(respostas).forEach(([questao, resposta]) => {
      if (gabaritoCorreto[Number(questao)] === resposta) {
        acertos++
      }
    })
    return acertos
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gabarito - Questões Diárias</CardTitle>
        <CardDescription>
          Preencha suas respostas para todas as 15 questões e clique em concluir para ver a correção
        </CardDescription>
      </CardHeader>
      <CardContent>
        {mostrarCorrecao ? (
          <div className="space-y-6">
            <div className="rounded-lg border p-4 bg-muted/30">
              <h3 className="text-lg font-medium mb-2">Resultado</h3>
              <p className="text-sm mb-1">
                Você acertou <span className="font-bold">{calcularAcertos()}</span> de 15 questões.
              </p>
              <Progress value={(calcularAcertos() / 15) * 100} className="h-2 mt-2" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Correção detalhada</h3>
              {Object.entries(gabaritoCorreto).map(([questao, resposta]) => {
                const questaoNum = Number(questao)
                const acertou = respostas[questaoNum] === resposta

                return (
                  <div
                    key={questao}
                    className={`p-3 rounded-lg border flex items-start gap-3 ${
                      acertou ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    {acertou ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <div className="font-medium">Questão {questao}</div>
                      <div className="text-sm">
                        {acertou ? (
                          <span className="text-green-700">Você acertou! Resposta: {resposta.toUpperCase()}</span>
                        ) : (
                          <span className="text-red-700">
                            Você respondeu: {respostas[questaoNum].toUpperCase()}. Resposta correta:{" "}
                            {resposta.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 15 }, (_, i) => i + 1).map((questao) => (
                <div key={questao} className="border rounded-lg p-4">
                  <div className="font-medium mb-2">Questão {questao}</div>
                  <RadioGroup
                    value={respostas[questao] || ""}
                    onValueChange={(value) => handleRespostaChange(questao, value)}
                    className="flex flex-col gap-2"
                  >
                    {["a", "b", "c", "d", "e"].map((alternativa) => (
                      <div key={alternativa} className="flex items-center space-x-2">
                        <RadioGroupItem value={alternativa} id={`q${questao}-${alternativa}`} />
                        <Label htmlFor={`q${questao}-${alternativa}`}>{alternativa.toUpperCase()}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/questoes-diarias">Voltar às questões</Link>
        </Button>
        {!mostrarCorrecao && (
          <Button onClick={verificarRespostas} disabled={!todasRespostasPreenchidas}>
            Concluir e ver correção
          </Button>
        )}
        {mostrarCorrecao && (
          <Button asChild>
            <Link href="/dashboard">Voltar ao Dashboard</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default function QuestoesDiarias() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const materia = searchParams.get("materia")
  const mostrarDiagnostico = searchParams.get("mostrarDiagnostico") === "true"
  const novaLista = searchParams.get("novaLista") === "true"
  const quantidade = searchParams.get("quantidade") || "15"
  const [questoesCompletas, setQuestoesCompletas] = useState(false)

  // Efeito para gerar nova lista de questões quando o parâmetro novaLista estiver presente
  useEffect(() => {
    if (novaLista) {
      // Em um cenário real, aqui você faria uma chamada à API para gerar novas questões
      console.log(`Gerando nova lista de ${quantidade} questões para a matéria: ${materia || "geral"}`)

      // Redirecionar para a primeira questão sem o parâmetro novaLista para evitar regeneração infinita
      // Em um cenário real, você redirecionaria para a primeira questão da nova lista
      // Esta linha está comentada para não causar redirecionamento infinito no ambiente de desenvolvimento
      // router.push(`/questoes-diarias?materia=${materia || 'geral'}&questao=1`);
    }
  }, [novaLista, materia, quantidade, router])

  const [alternativaSelecionada, setAlternativaSelecionada] = useState<string | null>(null)
  const [questaoRespondida, setQuestaoRespondida] = useState(false)
  const [respostaCorreta, setRespostaCorreta] = useState(false)
  const [alternativaCorreta] = useState("b") // Simulando que a alternativa correta é a "b"

  const verificarResposta = () => {
    setQuestaoRespondida(true)
    setRespostaCorreta(alternativaSelecionada === alternativaCorreta)
  }

  const irParaProximaQuestao = () => {
    setAlternativaSelecionada(null)
    setQuestaoRespondida(false)
    setRespostaCorreta(false)
    // Aqui você carregaria a próxima questão em um cenário real
  }

  // Função para simular a conclusão das questões e mostrar o diagnóstico
  const concluirQuestoes = () => {
    setQuestoesCompletas(true)
  }

  // Se as questões foram concluídas e devemos mostrar o diagnóstico
  if (questoesCompletas && mostrarDiagnostico) {
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
              <Link
                href="/questoes-diarias"
                className="text-sm font-medium transition-colors hover:text-primary text-primary"
              >
                Questões Diárias
              </Link>
              <Link href="/progresso" className="text-sm font-medium transition-colors hover:text-primary">
                Progresso
              </Link>
              <Link href="/desafios" className="text-sm font-medium transition-colors hover:text-primary">
                Desafios
              </Link>
            </nav>
            {/* Substituir o div do avatar do usuário por um dropdown menu */}
            {/* Localizar: */}
            {/* <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Olá, Maria</span>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                M
              </div>
            </div> */}

            {/* Substituir por: */}
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
          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Relatório de Diagnóstico</h1>
                <p className="text-sm text-muted-foreground">Análise do seu desempenho em Matemática</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Voltar ao Dashboard</Link>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Resumo da Sessão</CardTitle>
                <CardDescription>Você completou 15 questões de Matemática</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-medium">Taxa de acerto</div>
                    <div className="text-sm text-muted-foreground">73%</div>
                  </div>
                  <Progress value={73} className="h-2" />
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-2">Pontos fortes</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Geometria Plana</div>
                        <div className="text-sm text-muted-foreground">Você acertou 90% das questões deste tópico</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Funções do 1º Grau</div>
                        <div className="text-sm text-muted-foreground">Você acertou 85% das questões deste tópico</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <h3 className="text-lg font-medium mb-2">Áreas para melhorar</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Geometria Analítica</div>
                        <div className="text-sm text-muted-foreground">
                          Você acertou apenas 45% das questões deste tópico
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Trigonometria</div>
                        <div className="text-sm text-muted-foreground">
                          Você acertou apenas 50% das questões deste tópico
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/progresso">
                    Ver relatório completo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendações Personalizadas</CardTitle>
                <CardDescription>Com base no seu desempenho, recomendamos:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Revisar conceitos de Geometria Analítica</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Foque em distância entre ponto e reta, e equações de circunferências.
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Praticar mais questões de Trigonometria</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Especialmente relações trigonométricas no triângulo retângulo.
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Continuar praticando Geometria Plana</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Você está indo bem, mas mantenha a prática para consolidar o conhecimento.
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/questoes-diarias?novaLista=true&materia=geral&quantidade=15">Novas questões</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/dashboard">Voltar ao Dashboard</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    )
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
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link
              href="/questoes-diarias"
              className="text-sm font-medium transition-colors hover:text-primary text-primary"
            >
              Questões Diárias
            </Link>
            <Link href="/progresso" className="text-sm font-medium transition-colors hover:text-primary">
              Progresso
            </Link>
            <Link href="/desafios" className="text-sm font-medium transition-colors hover:text-primary">
              Desafios
            </Link>
          </nav>
          {/* Substituir o div do avatar do usuário por um dropdown menu */}
          {/* Localizar: */}
          {/* <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Olá, Maria</span>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              M
            </div>
          </div> */}

          {/* Substituir por: */}
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
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Questões Diárias</h1>
              <p className="text-sm text-muted-foreground">Personalizadas para seu nível de conhecimento</p>
            </div>
            <div className="flex items-center gap-2">
              {!questoesCompletas && (
                <>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <FileDown className="h-4 w-4" />
                    <span>Baixar PDF</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                    <Link href="/questoes-diarias?gabarito=true">
                      <FileText className="h-4 w-4" />
                      <span>Gabarito</span>
                    </Link>
                  </Button>
                </>
              )}
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Questão 3 de 15</span>
              </div>
            </div>
          </div>

          {searchParams.get("gabarito") === "true" ? (
            <GabaritoView />
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Progress value={20} className="h-2" />
                <span className="text-sm font-medium">20%</span>
              </div>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 text-primary font-medium text-sm px-3 py-1 rounded-full">
                        Matemática
                      </div>
                      <div className="text-sm text-muted-foreground">Geometria Analítica</div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <HelpCircle className="h-4 w-4" />
                      <span>Dificuldade: Média</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-base">
                    <p>
                      Considere uma circunferência de centro C(3, 4) e raio 5. Determine a equação da reta tangente a
                      essa circunferência no ponto P(7, 6).
                    </p>
                  </div>

                  <RadioGroup
                    className="space-y-3"
                    value={alternativaSelecionada || ""}
                    onValueChange={setAlternativaSelecionada}
                  >
                    <div
                      className={`flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 ${
                        questaoRespondida &&
                        alternativaSelecionada === "a" &&
                        alternativaSelecionada !== alternativaCorreta
                          ? "bg-red-50 border-red-300"
                          : ""
                      } ${questaoRespondida && alternativaCorreta === "a" ? "bg-green-50 border-green-300" : ""}`}
                    >
                      <RadioGroupItem value="a" id="a" disabled={questaoRespondida} />
                      <Label
                        htmlFor="a"
                        className={`flex-1 cursor-pointer ${
                          questaoRespondida && alternativaCorreta === "a" ? "font-medium text-green-700" : ""
                        } ${questaoRespondida && alternativaSelecionada === "a" && alternativaSelecionada !== alternativaCorreta ? "font-medium text-red-700" : ""}`}
                      >
                        4x - 2y - 16 = 0
                      </Label>
                    </div>
                    <div
                      className={`flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 ${
                        questaoRespondida &&
                        alternativaSelecionada === "b" &&
                        alternativaSelecionada !== alternativaCorreta
                          ? "bg-red-50 border-red-300"
                          : ""
                      } ${questaoRespondida && alternativaCorreta === "b" ? "bg-green-50 border-green-300" : ""}`}
                    >
                      <RadioGroupItem value="b" id="b" disabled={questaoRespondida} />
                      <Label
                        htmlFor="b"
                        className={`flex-1 cursor-pointer ${
                          questaoRespondida && alternativaCorreta === "b" ? "font-medium text-green-700" : ""
                        } ${questaoRespondida && alternativaSelecionada === "b" && alternativaSelecionada !== alternativaCorreta ? "font-medium text-red-700" : ""}`}
                      >
                        4x + 2y - 40 = 0
                      </Label>
                    </div>
                    <div
                      className={`flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 ${
                        questaoRespondida &&
                        alternativaSelecionada === "c" &&
                        alternativaSelecionada !== alternativaCorreta
                          ? "bg-red-50 border-red-300"
                          : ""
                      } ${questaoRespondida && alternativaCorreta === "c" ? "bg-green-50 border-green-300" : ""}`}
                    >
                      <RadioGroupItem value="c" id="c" disabled={questaoRespondida} />
                      <Label
                        htmlFor="c"
                        className={`flex-1 cursor-pointer ${
                          questaoRespondida && alternativaCorreta === "c" ? "font-medium text-green-700" : ""
                        } ${questaoRespondida && alternativaSelecionada === "c" && alternativaSelecionada !== alternativaCorreta ? "font-medium text-red-700" : ""}`}
                      >
                        2x - 4y + 10 = 0
                      </Label>
                    </div>
                    <div
                      className={`flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 ${
                        questaoRespondida &&
                        alternativaSelecionada === "d" &&
                        alternativaSelecionada !== alternativaCorreta
                          ? "bg-red-50 border-red-300"
                          : ""
                      } ${questaoRespondida && alternativaCorreta === "d" ? "bg-green-50 border-green-300" : ""}`}
                    >
                      <RadioGroupItem value="d" id="d" disabled={questaoRespondida} />
                      <Label
                        htmlFor="d"
                        className={`flex-1 cursor-pointer ${
                          questaoRespondida && alternativaCorreta === "d" ? "font-medium text-green-700" : ""
                        } ${questaoRespondida && alternativaSelecionada === "d" && alternativaSelecionada !== alternativaCorreta ? "font-medium text-red-700" : ""}`}
                      >
                        8x - 4y - 32 = 0
                      </Label>
                    </div>
                    <div
                      className={`flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 ${
                        questaoRespondida &&
                        alternativaSelecionada === "e" &&
                        alternativaSelecionada !== alternativaCorreta
                          ? "bg-red-50 border-red-300"
                          : ""
                      } ${questaoRespondida && alternativaCorreta === "e" ? "bg-green-50 border-green-300" : ""}`}
                    >
                      <RadioGroupItem value="e" id="e" disabled={questaoRespondida} />
                      <Label
                        htmlFor="e"
                        className={`flex-1 cursor-pointer ${
                          questaoRespondida && alternativaCorreta === "e" ? "font-medium text-green-700" : ""
                        } ${questaoRespondida && alternativaSelecionada === "e" && alternativaSelecionada !== alternativaCorreta ? "font-medium text-red-700" : ""}`}
                      >
                        4x - 4y + 4 = 0
                      </Label>
                    </div>
                  </RadioGroup>

                  {questaoRespondida && (
                    <div
                      className={`mt-4 p-4 rounded-lg ${respostaCorreta ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                    >
                      <div className={`font-medium ${respostaCorreta ? "text-green-700" : "text-red-700"}`}>
                        {respostaCorreta ? "Parabéns! Você acertou." : "Você errou."}
                      </div>
                      {!respostaCorreta && (
                        <div className="text-sm mt-1 text-red-600">
                          A resposta correta é a alternativa {alternativaCorreta.toUpperCase()}: 4x + 2y - 40 = 0
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  <div className="flex gap-2">
                    {!questaoRespondida ? (
                      <>
                        <Button onClick={verificarResposta} disabled={!alternativaSelecionada} variant="secondary">
                          Finalizar
                        </Button>
                        {mostrarDiagnostico && (
                          <Button onClick={concluirQuestoes}>
                            Ver diagnóstico atualizado
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button onClick={irParaProximaQuestao}>
                        Próxima questão
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Por que esta questão?</CardTitle>
                  <CardDescription>Entenda por que o Destrav.ai selecionou esta questão para você</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">Baseada no seu histórico</div>
                        <div className="text-sm text-muted-foreground">
                          Você acertou 65% das questões de Geometria Analítica, mas teve dificuldade com problemas
                          envolvendo tangentes a circunferências.
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">Relevância para o vestibular</div>
                        <div className="text-sm text-muted-foreground">
                          Este tipo de questão apareceu em 3 dos 5 últimos vestibulares de medicina mais concorridos.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
