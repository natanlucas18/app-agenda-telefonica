'use server'
import { RegisterForm } from "../types/register-schema";
import { ResponseServerDto } from "../types/response-server.dto";
import { User } from "../types/user";

export async function registerService(formData:RegisterForm):Promise<ResponseServerDto<User>> {
    const response = await fetch(`${process.env.API_URL}/users`, {
        method: 'POST',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(formData),
    });

    const responseData = await response.json();
    return responseData;
}