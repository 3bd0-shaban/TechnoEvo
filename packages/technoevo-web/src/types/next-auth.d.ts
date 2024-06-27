import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    role: string;
    department: string;
  }
}

declare module 'next-auth' {
  interface Session {
    access_token: string;
    role: string;
  }
  interface User {
    access_token: string;
    role: string;
  }
}
