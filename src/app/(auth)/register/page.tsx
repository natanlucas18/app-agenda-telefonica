"use client";
import { registerService } from '@/src/services/register-service';
import { PathLinks } from '@/src/types/path-links';
import { RegisterForm, registerFormSchema } from '@/src/types/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';



export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting},} = useForm<RegisterForm>({
    resolver:zodResolver(registerFormSchema)
  });

  const onSubmit = async (formData:RegisterForm) => {
    const {success} = await registerService(formData);

    if(!success) {
        toast('Falha ao criar conta!');
    }
    toast('Conta criada com sucesso!');
    redirect(PathLinks.LOGIN);
  };


  return (
    <div className="w-full h-[91vh] flex items-center justify-center main bg-neutral-100">
      <form action="POST" className='w-84 md:w-105 lg:w-full lg:max-w-md md:h-110 h-[450px] lg:h-[450px] p-6 bg-white shadow-md border border-gray-200 rounded-md' onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold mt-8 text-black">Crie sua conta</h1>
          <p className="text-gray-500 mb-2">Crie uma conta simples e rápido!</p>
          <input
            type="text"
            placeholder="Nome do usuário"
            className="border border-gray-400 text-gray-600 p-2 rounded-md w-64"
            {...register("name")}
          />
          {errors.name && (
            <span className='text-red-500 text-sm'>{errors.name.message}</span>
          )}
          <input
            type="email"
            placeholder="E-mail"
            className="border border-gray-400 text-gray-600 p-2 rounded-md w-64"
            {...register("email")}
          />
          {errors.email && (
            <span className='text-red-500 text-sm'>{errors.email.message}</span>
          )}
          <input
            type="password"
            placeholder="Senha"
            className="border border-gray-400 text-gray-600 p-2 rounded-md w-64"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
          <button
            type="submit"
            className="bg-black text-white w-60 px-6 py-2 mt-2 rounded-[20px] hover:bg-black/75 transition-colors cursor-pointer"
            disabled={isSubmitting}
          >
           { isSubmitting ? 'Criando conta...' : 'Criar conta' }
          </button>
        </div>
      </form>
    </div>
  );
}