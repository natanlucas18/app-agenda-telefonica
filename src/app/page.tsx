'use client';

import { redirect } from "next/navigation";
import { PathLinks } from "../types/path-links";


export  default function Home() {
  return redirect(`${PathLinks.CONTACTS}`)
}
