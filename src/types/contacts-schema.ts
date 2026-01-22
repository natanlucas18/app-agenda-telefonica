import z from 'zod';

export type Contact = {
    id: string;
    name: string;
    email: string;
    phone: string;
    createdAt: string;
};

export type ContactForm = {
    name: string;
    email: string;
    phone: string;
};

export const contactFormSchema = z.object({
    name: z.string().min(1, 'Insira um nome'),
    email: z.email('E-mail inválido').min(1, 'Insira um e-mail'),
    phone: z.string().min(1, 'Insira um número de telefone')
});

export type ContactFormType = z.infer<typeof contactFormSchema>;