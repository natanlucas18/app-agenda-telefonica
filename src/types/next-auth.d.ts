import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    accessToken: string
  }

  interface Session {
    user: {
      id: string
      accessToken: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string
  }
}
