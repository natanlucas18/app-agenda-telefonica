"use client"

import { LoginForm, loginFormSchema } from "@/src/types/login-schema"
import { PathLinks } from "@/src/types/path-links"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { appToast } from "@/src/lib/toast"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  })
  const router = useRouter();

const onSubmit = async (formData: LoginForm) => {
  const toastId = toast.loading("Entrando...")

  const result = await signIn("credentials", {
    ...formData,
    redirect: false,
  })

  if (result?.error) {
    appToast.error("E-mail ou senha inválidos")
    toast.dismiss(toastId)
    return
  }

  appToast.success("Login realizado com sucesso!")
  toast.dismiss(toastId)

  router.push(PathLinks.CONTACTS);
}


  return (
    <main className="flex items-center justify-center min-h-[91dvh] bg-neutral-100 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="text-sm text-gray-500">
            Faça login para acessar seus contatos
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="space-y-1">
              <Input
                placeholder="E-mail"
                type="email"
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
                placeholder="Senha"
                type="password"
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
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Não tem uma conta?{" "}
            <Link
              href={PathLinks.REGISTER}
              className="text-purple-700 hover:underline font-medium"
            >
              Registrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
