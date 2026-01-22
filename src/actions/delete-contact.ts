'use server';

import { cookies } from "next/headers";
import { Contact } from "../types/contacts-schema";
import { ResponseServerDto } from "../types/response-server.dto";

export async function deleteContact(id: string):Promise<ResponseServerDto<Contact>> {
  const res = await fetch(`${process.env.API_URL}/contacts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${(await cookies()).get('token')?.value}`,
    },
  });
  const response = await res.json();
  return response;
}
