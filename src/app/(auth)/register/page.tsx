"use client"

import { registerService } from "@/src/services/register-service"
import { PathLinks } from "@/src/types/path-links"
import {
  RegisterForm,
  registerFormSchema,
} from "@/src/types/register-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { appToast } from "@/src/lib/toast"

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
  })

  const onSubmit = async (formData: RegisterForm) => {
    const { success } = await registerService(formData)

    if (!success) {
      appToast.error("Falha ao criar conta")
      return
    }

    appToast.success("Conta criada com sucesso!")
    redirect(PathLinks.LOGIN)
  }

  return (
    <main className="flex items-center justify-center min-h-[91dvh] bg-neutral-100 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Crie sua conta
          </h1>
          <p className="text-sm text-gray-500">
            Crie uma conta simples e rápido
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-1">
              <Input
                placeholder="Nome"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                type="email"
                placeholder="E-mail"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Input
                type="password"
                placeholder="Senha"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-700 hover:bg-purple-600"
            >
              {isSubmitting ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Já tem uma conta?{" "}
            <a
              href={PathLinks.LOGIN}
              className="text-purple-700 hover:underline font-medium"
            >
              Entrar
            </a>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
