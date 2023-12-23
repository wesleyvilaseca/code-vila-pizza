"use client";
import logo from '../../../public/logo.svg';
import Image from 'next/image';
import Head from 'next/head';
import styles from '../../../styles/home.module.scss';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function SignupScreem() {
  const { signUp } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[loading, setLoading] = useState(false);

  async function handleSigUp(event: FormEvent) {
    event.preventDefault();

    if(email == '' || password == '' || name == '') {
      return alert('Preencha os dados');
    }
  
    setLoading(true);
  
    let data = {
      email,
      password,
      name
    };

    signUp(data);
    setLoading(false);
  }

  return (
    <>
     
      <div className={styles.containerCenter}>
      <Head>
        <title>My page title</title>
      </Head>
      <Image src={logo} alt="logo codevila pizza" width={100} priority />

        <div className={styles.login}>
          <h1> Criando sua conta </h1>
          <form onSubmit={handleSigUp}>
              <Input
                  placeholder='Digite seu nome'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              <Input
                  placeholder='Digite seu email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              <Input
                placeholder='Digite sua senha'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

              <Button 
                type="submit"
                loading={loading}
              >
                Cadastrar
              </Button>
          </form>
          <Link className={styles.text} href="/">
              Já possui uma conta? Faça login
          </Link>
        </div>
      </div>
    </>
  )
}
