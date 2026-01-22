import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useDeleteContact } from "../hooks/useDeleteContact";
import { toast } from "sonner";
import { useState } from "react";

export type ContactDeleteAlertProps = {
    contactId: string;
};

export function ContactDeleteAlert({ contactId }: ContactDeleteAlertProps) {
    const [open, setOpen] = useState(false);
    const {mutate,  } = useDeleteContact();

    const handleDelete = async (contactId: string) => {
        mutate(contactId, {
            onSuccess: () => {
                toast.success('Contato excluido com sucesso!', {
                    position: 'top-center'
                });
                setOpen(false);
            },
            onError: () => {
                toast.error('Falha ao excluir contato!', {
                    position: 'top-center',
                });
            },
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="flex items-center text-gray-500 hover:text-red-500 bg-trasparent hover:bg-transparent cursor-pointer gap-2 border-none">
                    <Trash />
                    <span>Excluir</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja apagar?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso excluirá permanentemente
                        esse contato dos nossos servidores.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        className="text-white bg-purple-700 hover:bg-purple-700/75"
                        onClick={() => handleDelete(contactId)}    
                    >Continuar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}