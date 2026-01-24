import React from "react"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Contact } from "../types/contacts-schema"
import EditContactForm from "./contact-edit-form"
import { ContactDeleteAlert } from "./contact-delete-alert"

export function ContactActions({ contact }: { contact: Contact }) {
  const [openMenu, setOpenMenu] = React.useState(false)

  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-neutral-100"
        >
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="text-gray-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>

        <EditContactForm
          defaultValues={contact}
          onCloseMenu={() => setOpenMenu(false)}
        />

        <DropdownMenuSeparator />

        <ContactDeleteAlert
          contactId={contact.id}
          onCloseMenu={() => setOpenMenu(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
