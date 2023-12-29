"use client";

import { api } from "@/services/apiClient";
import { isRedirectError } from "next/dist/client/components/redirect";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean,
    signIn: (credetials : SignInProps) => Promise<void>,
    signOut: () => void,
    signUp: (credentials: SignUpProps) => Promise<void> 
}

type UserProps = {
    id: string,
    name: string,
    email: string
}

type SignInProps = {
    email: string,
    password: string
}

type SignUpProps = {
    name: string,
    email: string,
    password: string
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {

    const router = useRouter();

    const [user, setUser] = useState<UserProps>();

    const isAuthenticated = !!user;

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();
        if(token) {
            api.get('/me')
            .then((res) => {
                const {id, name, email} = res.data;

                setUser({
                    id, name, email
                })
            })
            .catch(() => {
                signOut();
            })
        }
    }, []);

    async function signIn({email, password}: SignInProps) {
        try {
            const response = await api.post('/session', {
                email, password
            });

            const { name, id, token } = response.data;
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60*60*24*30 ,//expires on 1 month
                path: "/"
            });

            setUser({
                id,
                name,
                email
            });

            //set token on next requests
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            toast.success('Logado com sucesso');
        } catch (error) {
            throw error;
        }
        router.push('/dashboard');
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const res = await api.post('/users', { name, email, password});
            router.push('/');
            toast.success('Cadastro realizado com sucesso!');
        } catch(error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}> {children} </AuthContext.Provider>
    );
}

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token', {
            path: '/'
        });
    } catch (error) {
        if(isRedirectError(error)) {
            throw error;
        }
    }

    window.location.replace('/');
}