import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const url = process.env.NEXT_PUBLIC_Server_APi;

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/logout',
    error: '/auth/error', // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials?: Record<'email' | 'password', string>) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('invalid credentials');
        }
        const { email, password } = credentials;
        const res = await fetch(url + '/api/auth/signin', {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
          },
          body: JSON.stringify({ email, password }),
        });
        const result = await res.json();
        if (res.ok && result) {
          return result;
        }

        return null;
      },
    }),
  ],

  //
  //

  /** account:
     * @example
     *  {
         providerAccountId: undefined,
         type: 'credentials',
         provider: 'credentials'
        }
    *
     * user is the response when user make login request otherwise it's undefined
     * @example
        {
            status:'success',
            token:'token-here,
            user:user-properties-here,
        }
     * token is the values we declared in next-auth.d.tsx {token,user,role} with values {iat,exp,jti} which is decripted from the JWT token recived from server;
     * @param {
     *      token.token
            token.user 
            token.role 
     * }
     * Some form decripting JWT
     * {iat,exp,jti}
     */

  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.access_token = user.access_token;
        token.role = user.role;
      }
      if (trigger === 'update' && session?.access_token && session.role) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.access_token = session.access_token;
        token.role = session.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.access_token = token.access_token;
      session.role = token.role;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
};

export default authOptions;
