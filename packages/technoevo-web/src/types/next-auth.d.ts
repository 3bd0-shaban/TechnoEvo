import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { iClient } from './Titra/iClient';

declare module 'next-auth/jwt' {
  interface JWT {
    user: iClient;
    accessToken: string;
    role: string;
    department: string;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    role: string;
  }
  interface User {
    accessToken: string;
    role: string;
  }
}
