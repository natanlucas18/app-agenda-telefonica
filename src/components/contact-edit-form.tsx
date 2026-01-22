'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
    Contact,
  contactFormSchema,
  ContactFormType,
} from '../types/contacts-schema';
import { PencilLine } from 'lucide-react';
import { Separator } from '@radix-ui/react-select';
import { useUpdateContact } from '../hooks/useUpdateContact';

export type EditContactProps = {
    defaultValues: Contact
}

export default function EditContactForm({defaultValues}: EditContactProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const contactId = defaultValues.id;
  const { mutate, isPending } = useUpdateContact();

  const onSubmit = (formData: ContactFormType) => {
    mutate({
        id:contactId,
        data: formData,
        },
        {
      onSuccess: () => {
        toast.success('Contato editado com sucesso!');
        form.reset();
        setOpen(false);
      },
      onError: () => {
        toast.error('Falha ao editar contato');
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center text-gray-500 hover:text-purple-700 bg-trasparent hover:bg-transparent cursor-pointer gap-2 border-none">
            <PencilLine />
            <span>Editar</span>
        </Button>
      </DialogTrigger>

      <DialogContent className='border border-gray-100 text-purple-700'>
        <DialogHeader>
          <DialogTitle className='text-black'>Editar Contato</DialogTitle>
        </DialogHeader>

        <Separator/>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-600'>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} className='text-gray-500'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-600'>Email</FormLabel>
                  <FormControl>
                    <Input {...field} className='text-gray-500'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-600'>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} className='text-gray-500'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' disabled={isPending} className='bg-purple-700 hover:bg-purple-700/75 text-white cursor-pointer'>
              {isPending ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
