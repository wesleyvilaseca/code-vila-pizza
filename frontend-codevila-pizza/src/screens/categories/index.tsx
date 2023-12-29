"use client";

import { Header } from "@/components/Header";
import styles from './style.module.scss';
import { useState } from "react";

export function CategoriesScreem() {
    const [name, setName] = useState('');

    async function handleRegister() {

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