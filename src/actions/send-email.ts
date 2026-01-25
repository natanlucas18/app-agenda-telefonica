'use server';

import { cookies } from "next/headers";
import { SendEmailPayload } from "../types/send-email-schema";
import { ResponseServerDto } from "../types/response-server.dto";

export async function sendEmail(data: SendEmailPayload):Promise<ResponseServerDto<void>> {
  const response = await fetch(`${process.env.API_URL}/email/send`, {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${(await cookies()).get('token')?.value}`
    },
    body: JSON.stringify(data),
  })
  const responseData = await response.json();
  return responseData;
}
