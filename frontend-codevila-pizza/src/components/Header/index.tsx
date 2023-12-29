"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './style.module.scss';
import logo from '../../../public/logo.svg';
import {FiLogOut} from 'react-icons/fi';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function Header() {

    const { signOut } = useContext(AuthContext);

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/admin/dashboard'>
                    <Image src={logo} alt="logo codevila pizza" width={60} height={60} priority ></Image>
                </Link>

                <nav className={styles.menuNav}>
                    <Link href='/admin/category' className={styles.links}>
                        Categorias
                    </Link>
                    <Link href='/admin/products' className={styles.links}>
                        Produtos
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut  color='#fff' size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}