import { Children, ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = '@codevilapizza';

//state
type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean,
    loading: boolean,
    signIn: (credentials: SignProps) => Promise<void>,
    signOut: () => Promise<void>
}

type UserProps = {
    userId: string,
    name: string,
    email: string,
    token: string
}

type AuthProviderProps = {
     children: ReactNode
}

type SignProps = {
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider( { children }: AuthProviderProps ) {
    const [user, setUser] = useState<UserProps>({
        userId: '',
        name: '',
        token: '',
        email: ''
    });

    const [loading, setLoading] = useState(true); 

    const isAuthenticated = !!user.userId;

    useEffect(() => {
        async function getUser() {
            const userInfo = await AsyncStorage.getItem(TOKEN_KEY);
            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            if(hasUser.token) {
                setTokenOnHearders(hasUser.token);
                setUser({
                    userId: hasUser.userId,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                });
            }
        }

       getUser();
       setLoading(false)
    },[]);

    const setTokenOnHearders = (token: string) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const signIn = async ({ email, password } : SignProps) => {
        setLoading(true);

        try {
            const response = await api.post('/session', {
                email,
                password
            });

            const { userId, name, token } = response.data;

            const data ={
                ...response.data
            };

            setTokenOnHearders(token);
            await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(data));

            setUser({
                userId: userId,
                name: name,
                token: token,
                email: email
            });
        } catch (error) {
            console.log('erro ao acessar');
            // throw error;
        } finally {
            setLoading(false);
        }
    }

    const signOut = async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
        setUser({
            userId: '',
            name: '',
            token: '',
            email: ''
        });
    }
    return(
        <AuthContext.Provider value={{ user, isAuthenticated, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}