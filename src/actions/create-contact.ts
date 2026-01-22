'use server';
import { Contact, ContactForm } from "../types/contacts-schema";
import { ResponseServerDto } from "../types/response-server.dto";
import { cookies } from "next/headers";

export async function createContact(contactForm:ContactForm):Promise<ResponseServerDto<Contact>> {
    const response = await fetch(`${process.env.API_URL}/contacts`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${(await cookies()).get('token')?.value}`
        },
        body: JSON.stringify(contactForm)
    });

    const responseData = await response.json();
    return responseData;
}