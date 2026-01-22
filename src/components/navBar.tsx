'use client'

import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { PathLinks } from "../types/path-links";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavBar() {
    const { data: session, status } = useSession();
    return (
        <nav className="w-full h-[9dvh] flex flex-row justify-between items-center bg-white/95 px-6 backdrop-blur shadow-[0_4px_20px_rgba(126,34,206,0.25)]">
            <h1 className='font-bold text-black'>AgendaApp</h1>
            {status === 'authenticated' ? (
                <div className='flex flex-row gap-5 items-center'>
                    <h2 className='text-black'>Olá {session?.user?.name?.split(' ')[0]}</h2>
                    <Button
                        onClick={() => signOut()}
                        className='flex bg-red-500 cursor-pointer hover:bg-red-500/75 w-20 h-8 md:w-26 md:h-10 lg:w-26 lg:h-10 rounded-md gap-2'>
                        <LogOut className="text-white" />
                        <span className="text-lg">Sair</span>
                    </Button>
                </div>
            ) : (
                <Button className='bg-purple-700 cursor-pointer hover:bg-purple-600 w-20 h-8 md:w-26 md:h-10 lg:w-26 lg:h-10 rounded-md'>
                    <Link
                        href={PathLinks.LOGIN}
                        className='text-white flex gap-2 px-2'>
                        <LogIn className="text-white" />
                        <span>Entrar</span>
                    </Link>
                </Button>
            )}
        </nav>
    )
}