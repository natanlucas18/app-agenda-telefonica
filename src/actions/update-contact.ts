'use server';
import { cookies } from "next/headers";
import { Contact, ContactForm, ContactFormType } from "../types/contacts-schema";
import { ResponseServerDto } from "../types/response-server.dto";

export type UpdateContactPayload = {
  id: string,
  data: ContactFormType,
}
export async function updateContact({id, data}: UpdateContactPayload):Promise<ResponseServerDto<Contact>> {
  const response = await fetch(`${process.env.API_URL}/contacts/${id}`, {
    method: 'PATCH',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${(await cookies()).get('token')?.value}`,
    },
    body: JSON.stringify(data)
  });
    const responseData = await response.json();
    return responseData;
}
