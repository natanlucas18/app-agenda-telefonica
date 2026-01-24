import z from "zod";

export type SendEmailPayload = {
  to: string
  subject: string
  message: string
}


export const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1, "Informe o assunto"),
  message: z.string().min(1, "Escreva uma mensagem"),
})

export type SendEmailFormType = z.infer<typeof sendEmailSchema>
