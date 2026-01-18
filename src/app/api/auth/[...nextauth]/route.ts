import { PathLinks } from '@/src/types/path-links';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  pages: {
    signIn: PathLinks.LOGIN
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {}
      },

      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const { data, success } = await login({
            username: credentials.username,
            password: credentials.password
          });

          if (!success) return null;

          return {
            id: data.userId,
            name: data.userName,
            email: data.email,
            accessToken: data.accessToken,
          };
        } catch {
          return null;
        }
      }
    })
     
  ],
  callbacks: {
    async jwt({ user, token }) {
      if(user) {
      token.sub = user.id;
      token.name = user.name;
      token.email = user.email;
      token.accessToken = user.accessToken
      };
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
      session.user.id = token.sub as string;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.accessToken = token.accessToken as string
      }
      return session;
    }
  }
  
});


export { handler as GET, handler as POST };
