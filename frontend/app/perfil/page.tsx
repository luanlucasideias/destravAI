"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Camera, Mail, Phone, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 98765-4321",
    instituicao: "Universidade Federal",
    curso: "Medicina",
    anoIngresso: "2025",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para salvar os dados
    setIsEditing(false)
    alert("Dados atualizados com sucesso!")
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
            <h1 className="text-3xl font-bold">Meu Perfil</h1>
          </div>

          <Tabs defaultValue="informacoes">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="informacoes">Informações</TabsTrigger>
              <TabsTrigger value="foto">Foto de Perfil</TabsTrigger>
            </TabsList>
            <TabsContent value="informacoes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Visualize e edite suas informações cadastrais</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome completo</Label>
                          {isEditing ? (
                            <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                          ) : (
                            <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                              <User className="mr-2 h-4 w-4 text-muted-foreground" />
                              {formData.nome}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          {isEditing ? (
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          ) : (
                            <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                              {formData.email}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone</Label>
                          {isEditing ? (
                            <Input id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
                          ) : (
                            <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                              {formData.telefone}
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="instituicao">Instituição de Ensino</Label>
                          {isEditing ? (
                            <Input
                              id="instituicao"
                              name="instituicao"
                              value={formData.instituicao}
                              onChange={handleChange}
                            />
                          ) : (
                            <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                              {formData.instituicao}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="curso">Curso</Label>
                          {isEditing ? (
                            <Input id="curso" name="curso" value={formData.curso} onChange={handleChange} />
                          ) : (
                            <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                              {formData.curso}
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="anoIngresso">Ano de Ingresso Desejado</Label>
                          {isEditing ? (
                            <Input
                              id="anoIngresso"
                              name="anoIngresso"
                              value={formData.anoIngresso}
                              onChange={handleChange}
                            />
                          ) : (
                            <div className="flex items-center h-10 px-3 rounded-md border bg-muted/50">
                              {formData.anoIngresso}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex justify-end gap-2 mt-6">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancelar
                        </Button>
                        <Button type="submit">Salvar alterações</Button>
                      </div>
                    )}
                  </form>
                </CardContent>
                {!isEditing && (
                  <CardFooter>
                    <Button onClick={() => setIsEditing(true)} className="w-full">
                      Editar informações
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            <TabsContent value="foto" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Foto de Perfil</CardTitle>
                  <CardDescription>Atualize sua foto de perfil</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Maria Silva" />
                    <AvatarFallback className="text-4xl">M</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <Button className="gap-2">
                      <Camera className="h-4 w-4" />
                      Escolher nova foto
                    </Button>
                    <Button variant="outline">Remover foto</Button>
                  </div>
                  <div className="text-sm text-muted-foreground text-center max-w-sm">
                    Formatos aceitos: JPG, PNG ou GIF. Tamanho máximo: 5MB.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
