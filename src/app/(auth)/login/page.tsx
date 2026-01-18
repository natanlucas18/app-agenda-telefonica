"use client";
import { LoginForm, loginFormSchema } from '@/src/types/login-schema';
import { PathLinks } from '@/src/types/path-links';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema)
  });

  const onSubmit = async (formData: LoginForm) => {
      signIn('credentials', {
        ...formData,
        callbackUrl: PathLinks.HOME
      });
  };
  return (
    <div className="bg-white w-full h-[91dvh] flex flex-col items-center justify-center main">
      <form action="POST" className='w-full max-w-md h-[450px] p-6 bg-white border border-gray-200 shadow-md rounded-[15px]' onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold mb-1 text-black mt-6">Login</h1>
          <p className="text-gray-500 mb-4">Faça login para acessar os seus contatos!</p>
          <input
            placeholder="E-mail"
            className="border border-gray-400 p-2 rounded-md w-64 text-gray-600"
            {...register("email")}
          />
          {errors.email && (
            <span className='text-red-500 text-sm'>{errors.email.message}</span>
          )}
          <input
            placeholder="Senha"
            className="border border-gray-400 p-2 rounded-md w-64 mt-2 text-gray-600"
            {...register("password")}
          />
          {errors.password && (
            <span className='text-red-500 text-sm'>{errors.password.message}</span>
          )}
          <button
            type="submit"
            className="bg-black text-white font-bold w-58 px-6 py-2 rounded-[20px] hover:bg-zinc-900 hover:text-purple-700 transition-colors cursor-pointer"
            disabled={isSubmitting}
          >
            { isSubmitting ? 'Logando...' : 'Entrar'}
          </button>
        </div>
        <div className="mt-2 text-center">
          <p className="text-gray-500">Não tem uma conta? <Link href={PathLinks.REGISTER} className="text-purple-700 hover:underline">Registrar</Link></p>
        </div>
      </form>
    </div>
  );
}