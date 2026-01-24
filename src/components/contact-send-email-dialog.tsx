"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import { appToast } from "@/src/lib/toast"
import { SendEmailFormType, sendEmailSchema } from "../types/send-email-schema"
import { useSendEmail } from "../hooks/useSendEmail"

type SendEmailDialogProps = {
  email: string
  onCloseMenu?: () => void
}

export function SendEmailDialog({
  email,
  onCloseMenu,
}: SendEmailDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<SendEmailFormType>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      to: email,
      subject: "",
      message: "",
    },
  })

  const { mutate, isPending } = useSendEmail()

  const onSubmit = (data: SendEmailFormType) => {
    mutate(data, {
      onSuccess: () => {
        appToast.success("E-mail enviado com sucesso")
        setOpen(false)
        onCloseMenu?.()
        form.reset({ to: email, subject: "", message: "" })
      },
      onError: () => {
        appToast.error("Erro ao enviar e-mail")
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:text-purple-700"
        >
          <Mail size={16} />
          Enviar e-mail
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enviar e-mail</DialogTitle>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destinatário</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assunto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Assunto do e-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escreva sua mensagem..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-purple-700 hover:bg-purple-600"
              >
                {isPending ? "Enviando..." : "Enviar e-mail"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
