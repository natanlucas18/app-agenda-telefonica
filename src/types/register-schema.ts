import z from 'zod';

export type RegisterForm = {
  name: string; 
  email: string;
  password: string;
};

export const registerFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('E-mail inválido').min(1, 'E-mail é obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
})

export type RegisterFormType = z.infer<typeof registerFormSchema>;

