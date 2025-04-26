"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, Clock, HelpCircle, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { FileDown, FileText, CheckCircle2, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import YouTube from 'react-youtube'

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

interface Question {
  id: number;
  competencyId: number;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: number;
  competencyDescription: string;
  subjectCode: string;
  topicCode: string;
}

interface Competency {
  id: number;
  name: string;
  description: string;
}

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
  const materia = searchParams?.get("materia") ?? null
  const mostrarDiagnostico = searchParams?.get("mostrarDiagnostico") === "true"
  const novaLista = searchParams?.get("novaLista") === "true"
  const quantidade = searchParams?.get("quantidade") || "15"
  const [questoesCompletas, setQuestoesCompletas] = useState(false)
  const [currentCompetency, setCurrentCompetency] = useState<Competency | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alternativaSelecionada, setAlternativaSelecionada] = useState<string | null>(null);
  const [questaoRespondida, setQuestaoRespondida] = useState(false);
  const [showResolucao, setShowResolucao] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [respostasBloco, setRespostasBloco] = useState<{ questionId: number; answer: string }[]>([]);

  // Buscar próxima competência
  const fetchNextCompetency = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/competencies/student/123e4567-e89b-12d3-a456-426614174000/next`);
      const data = await response.json();
      console.log('Competência recebida:', data);
      
      // Criar objeto de competência com o ID recebido
      const competency = {
        id: data.competencyId,
        name: "Competência " + data.competencyId,
        description: "Descrição da competência"
      };
      
      setCurrentCompetency(competency);
      return competency;
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError('Erro ao buscar próxima competência');
      return null;
    }
  };

  // Buscar questões da competência
  const fetchQuestions = async (competencyId: number) => {
    try {
      console.log('Buscando questões para competência:', competencyId);
      const response = await fetch(
        `http://localhost:3001/api/competencies/student/123e4567-e89b-12d3-a456-426614174000/competencies/${competencyId}/questions`
      );
      const data = await response.json();
      console.log('Questões recebidas do backend:', data);
      
      // Atualizar informações da competência
      setCurrentCompetency({
        id: data.competencyInfo.id,
        name: data.competencyInfo.description,
        description: `${data.competencyInfo.subjectCode} - ${data.competencyInfo.topicCode}`
      });
      
      setCurrentQuestions(data.questions);
      setCurrentQuestionIndex(0);
      setQuestaoRespondida(false);
      setAlternativaSelecionada(null);
      setSessionId(data.sessionId || null);
      setRespostasBloco([]);
    } catch (err) {
      setError('Erro ao buscar questões');
      console.error('Erro detalhado ao buscar questões:', err);
    }
  };

  // Processar resposta localmente
  const handleAnswer = (answer: string) => {
    if (!currentCompetency || !currentQuestions[currentQuestionIndex]) return;
    // Armazenar resposta localmente
    setRespostasBloco(prev => [
      ...prev,
      { questionId: currentQuestions[currentQuestionIndex].id, answer }
    ]);
    // Verificar se é a última questão do bloco
    if (currentQuestionIndex === currentQuestions.length - 1) {
      // Enviar todas as respostas do bloco ao backend
      if (sessionId) {
        fetch(
          `http://localhost:3001/api/competencies/student/123e4567-e89b-12d3-a456-426614174000/competencies/${currentCompetency.id}/answers`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              answers: [...respostasBloco, { questionId: currentQuestions[currentQuestionIndex].id, answer }],
              sessionId
            })
          }
        ).then(async (res) => {
          if (!res.ok) {
            setError('Erro ao processar respostas do bloco');
            return;
          }
          // Buscar nova competência
          const newCompetency = await fetchNextCompetency();
          if (newCompetency) {
            await fetchQuestions(newCompetency.id);
          }
        });
      }
    } else {
      // Próxima questão do bloco
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestaoRespondida(false);
      setAlternativaSelecionada(null);
    }
  };

  // Inicialização
  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      const competency = await fetchNextCompetency();
      if (competency) {
        await fetchQuestions(competency.id);
      }
      setIsLoading(false);
    };

    initialize();
  }, []);

  const verificarResposta = () => {
    if (!alternativaSelecionada) return;
    setQuestaoRespondida(true);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!currentCompetency || !currentQuestions[currentQuestionIndex]) {
    console.log('Condição de renderização falhou:', {
      currentCompetency,
      currentQuestions,
      currentQuestionIndex,
      hasCurrentQuestion: currentQuestions[currentQuestionIndex]
    });
    return <div>Nenhuma questão disponível no momento.</div>;
  }

  const currentQuestion = currentQuestions[currentQuestionIndex];
  console.log('Questão atual:', currentQuestion);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link href="/">
              <img src="/assets/logo_destravai.png" alt="Logo Destrav.ai" className="h-10 w-auto" />
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
                <span>Questão {currentQuestionIndex + 1} de {currentQuestions.length}</span>
              </div>
            </div>
          </div>

          {searchParams?.get("gabarito") === "true" ? (
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
                        {currentCompetency?.description}
                      </div>
                      <div className="text-sm text-muted-foreground">{currentCompetency?.name}</div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <HelpCircle className="h-4 w-4" />
                      <span>Dificuldade: {currentQuestion?.difficulty === 1 ? 'Fácil' : currentQuestion?.difficulty === 2 ? 'Média' : 'Difícil'}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-base">
                    <p>
                      {currentQuestion.text}
                    </p>
                  </div>

                  <RadioGroup
                    className="space-y-3"
                    value={alternativaSelecionada || ""}
                    onValueChange={setAlternativaSelecionada}
                    disabled={questaoRespondida}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 ${
                          questaoRespondida &&
                          alternativaSelecionada === option
                            ? "bg-green-50 border-green-300"
                            : ""
                        }`}
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} disabled={questaoRespondida} />
                        <Label
                          htmlFor={`option-${index}`}
                          className={`flex-1 cursor-pointer ${
                            questaoRespondida && alternativaSelecionada === option ? "font-medium text-green-700" : ""
                          }`}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {questaoRespondida && (
                    <div
                      className={`mt-4 p-4 rounded-lg ${alternativaSelecionada === currentQuestion.correctAnswer ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                    >
                      <div className={`font-medium ${alternativaSelecionada === currentQuestion.correctAnswer ? "text-green-700" : "text-red-700"}`}>
                        {alternativaSelecionada === currentQuestion.correctAnswer ? "Parabéns! Você acertou." : "Você errou. A resposta correta é: " + currentQuestion.correctAnswer}
                      </div>
                      {alternativaSelecionada !== currentQuestion.correctAnswer && (
                        <Button 
                          variant="outline" 
                          className="mt-2"
                          onClick={() => setShowResolucao(true)}
                        >
                          Ver resolução
                        </Button>
                      )}
                    </div>
                  )}

                  <Dialog open={showResolucao} onOpenChange={setShowResolucao}>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                          <span>Resolução da questão</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setShowResolucao(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="aspect-video">
                        <YouTube
                          videoId="o1Z9QGmHGqQ"
                          opts={{
                            playerVars: {
                              autoplay: 0,
                              controls: 1,
                              modestbranding: 1,
                            },
                          }}
                          className="w-full h-full"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
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
                        <Button variant="secondary">
                          Ir para a próxima questão
                        </Button>
                        <Button onClick={() => router.push('/progresso')}>
                          Ver diagnóstico atualizado
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => handleAnswer(alternativaSelecionada!)}>
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
