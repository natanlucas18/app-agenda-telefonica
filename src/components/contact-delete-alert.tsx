"use client"

import { useState } from "react"
import { Trash } from "lucide-react"

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
import { Button } from "@/components/ui/button"

import { useDeleteContact } from "../hooks/useDeleteContact"
import { appToast } from "@/src/lib/toast"

type ContactDeleteAlertProps = {
  contactId: string
  onCloseMenu?: () => void
}

export function ContactDeleteAlert(
  { contactId,
    onCloseMenu
   }: ContactDeleteAlertProps) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useDeleteContact()

  const handleDelete = () => {
    mutate(contactId, {
      onSuccess: () => {
        appToast.success("Contato excluído com sucesso")
        setOpen(false)
        onCloseMenu?.()
      },
      onError: () => {
        appToast.error("Erro ao excluir contato")
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:text-red-600"
        >
          <Trash size={16} />
          Excluir
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900">
            Excluir contato
          </AlertDialogTitle>

          <AlertDialogDescription>
            Essa ação não pode ser desfeita. O contato será removido
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
