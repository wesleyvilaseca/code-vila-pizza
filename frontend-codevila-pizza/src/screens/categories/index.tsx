"use client";

import { Header } from "@/components/Header";
import styles from './style.module.scss';
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/services/apiClient";
import { useRouter } from 'next/navigation';

export function CategoriesScreem() {
    const [name, setName] = useState('');
    const route = useRouter();

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if(name === '') {
            toast.error('Nome é um campo obrigatório');
            return;
        }

        await api.post('/category', {name: name})
        .then(() => {
            toast.success('Categoria cadastrada com sucesso');
        })
        .catch(() => {
            toast.error('Falha na operação, tente novamente');
        });

    }

    return(
        <>
            <Header />
            <main className={styles.container}>
                <h1>Cadastrar categoria</h1>

                <form onSubmit={handleRegister} className={styles.form}>
                    <input 
                    type="text"
                    placeholder="Digite o nome da categoria"
                    className={styles.input}
                    name={name}
                    onChange={(e) => setName(e.target.value)}
                    />

                    <button type="submit" className={styles.buttonAdd}>
                        Cadastrar
                    </button>
                </form>
            </main>
        </>
    )
}