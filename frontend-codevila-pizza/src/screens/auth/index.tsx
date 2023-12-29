"use client";
import { FormEvent, useContext, useState } from 'react';
import logo from '../../../public/logo.svg';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

import { AuthContext } from '@/contexts/AuthContext';

const AuthScreem = () => {
  const { signIn } = useContext(AuthContext);
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email == '' || password == '') {
      return alert('Preencha os dados');
    }
  
    try {
      setLoading(true);
      let data = { email, password };
      signIn(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="logo codevila pizza" width={100} priority />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
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
                Acessar
              </Button>
          </form>
          <Link className={styles.text} href="/signup">
              Não possui uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  )
}

export default AuthScreem;