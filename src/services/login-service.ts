'use server';

import { LoginForm } from "../types/login-schema";
import { ResponseServerDto } from "../types/response-server.dto";
import { User } from "../types/user";


export async function login(formData:LoginForm):Promise<ResponseServerDto<User>> {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(formData),
    });

    const responseData = await response.json();
    return responseData;
}