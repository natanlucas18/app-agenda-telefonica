'use client'

import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { PathLinks } from "../types/path-links";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@radix-ui/react-menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogIn, LogOut } from "lucide-react";

export function NavBar() {
    const { data: session, status } = useSession();
    const firstLetter = session?.user.name?.charAt(0)
    return (
        <nav className="w-full h-[9dvh] flex flex-row justify-between items-center bg-white/95 px-6 backdrop-blur shadow-[0_4px_20px_rgba(126,34,206,0.25)]">
            <h1 className='font-bold text-black'>AgendaApp</h1>
            {status === 'authenticated' ? (
                <div className='flex flex-row gap-2 items-center'>
                    <h2 className='text-black'>Olá {session?.user?.name}</h2>
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger className="w-10 h-10 border border-gray-200 rounded-[50%]">
                                <Avatar>
                                    <AvatarImage src='' className='h-10 w-10 rounded-[50%]' />
                                    <AvatarFallback className="text-purple-700">{firstLetter}</AvatarFallback>
                                </Avatar>
                            </MenubarTrigger>
                            <MenubarContent side="bottom" className="w-40 bg-white/95 px-4 py-4 mr-4 rounded-xl border border-neutral-200">
                                <MenubarItem
                                    onClick={() => signOut()}
                                    className="cursor-pointer hover:bg-neutral-100 border-none hover:border-none flex gap-2">
                                    <LogOut className="text-neutral-400"/>
                                    <span className="text-lg">Sair</span>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
            ) : (
                <button className='bg-purple-700 cursor-pointer hover:bg-purple-600 w-26 h-10 rounded-md'>
                    <Link 
                        href={PathLinks.LOGIN}
                        className='text-white flex gap-2 px-2'>
                            <LogIn className="text-white"/>
                            <span>Entrar</span>
                    </Link>
                </button>
            )}
        </nav>
    )
}