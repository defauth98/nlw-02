import React, { createContext, useState } from 'react';
import api from '../services/api';

export interface AuthContextData {
  signed: boolean;
  user: User;
  token: string;
  subject: string;
  login(email: string, password: string): Promise<void>;
  SignIn(
    email: string,
    password: string,
    name: string,
    surname: string
  ): Promise<void>;
}

interface User {
  id: string;
  name: string;
  surname: string;
  avatar_url: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [userState, setUser] = useState<User>({} as User);
  const [subject, setSubject] = useState('');
  const [token, setToken] = useState('');
  const [signed, setSigned] = useState(false);

  async function login(email: string, password: string) {
    const response = await api.post('/login', {
      email,
      password,
    });

    const subject = await api.get(`/classes/${response.data.user.id}`, {
      headers: { Authorization: `Bearer ${response.data.token}` },
    });

    setUser({
      id: response.data.user.id,
      name: response.data.user.name,
      surname: response.data.user.surname,
      avatar_url: response.data.user.avatar,
    });
    setToken(response.data.token);
    setSigned(true);

    setSubject(subject.data.class.subject);
  }

  async function SignIn(
    name: string,
    password: string,
    surname: string,
    email: string
  ) {
    const response = await api.post('signup', {
      name,
      surname,
      email,
      password,
    });

    setUser(response.data.user);
    setToken(response.data.token);
    setSigned(true);
  }

  return (
    <AuthContext.Provider
      value={{
        signed,
        user: userState,
        token,
        login,
        SignIn,
        subject,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
