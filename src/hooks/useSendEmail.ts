import { useMutation } from "@tanstack/react-query"
import { SendEmailPayload } from "../types/send-email-schema"
import { sendEmail } from "../actions/send-email"

export function useSendEmail() {
  return useMutation({
    mutationFn: (data: SendEmailPayload) =>
      sendEmail(data),
  })
}
