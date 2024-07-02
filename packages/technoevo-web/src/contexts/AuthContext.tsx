'use client';
import { createContext, FC, useContext, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { deleteCookie, setCookie } from 'cookies-next';
import { refreshToken } from '@/services/refreshToken';
import { Session } from 'next-auth';

interface AuthContextProps {
  access_token?: string;
}

const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider: FC<{
  children: React.ReactNode;
  session: Session | null;
}> = ({ children, session }) => {
  useEffect(() => {
    const refreshAndHandleLoading = async () => {
      await refreshToken()
        .then(({ access_token }) => {
          setCookie('access_token', access_token, { secure: true });
        })
        .catch((error) => {
          deleteCookie('access_token');
          console.log(session);
          if (session) {
            console.log('logging out');
            signOut();
          }
        });
    };

    refreshAndHandleLoading();
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const authState = useContext(AuthContext);
  return authState;
};

export default useAuth;
