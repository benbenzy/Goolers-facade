'use client';
import { useContext, createContext, useState, useEffect } from 'react';

import { createClient } from '@/utils/supabase/client';
import { Session } from 'next-auth';

type AuthContextType = {
  currentUser: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    group: string;
    avatar_url: string;
  };
  authSession: any;
  logOut: any;
};

const AuthContext = createContext<AuthContextType | any>(undefined);
export const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<
    AuthContextType['currentUser'] | any
  >(null);
  const [authSession, setAuthSession] = useState<Session | any>(null);

  const supabase = createClient();
  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthSession(session ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    const user = async () => {
      if (authSession) {
        const { data: userData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authSession?.user?.id)
          .single();
        setCurrentUser(userData);
      }
    };
    user();
  }, [authSession]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
