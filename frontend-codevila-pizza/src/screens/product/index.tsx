"use client";
import { Header } from "@/components/Header";
import styles from './style.module.scss';
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/services/apiClient";
import { useRouter } from 'next/navigation';

const ProductsScreem = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
  
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);
  
    const [categories, setCategories] = useState();
    const [categorySelected, setCategorySelected] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            setCategories(await getCategory());
        };

        fetchCategories();

    }, [])

    const route = useRouter();

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if(name === '') {
            toast.error('Nome é um campo obrigatório');
            return;
        };
    }

    function handleChangeCategory(event){
        setCategorySelected(event.target.value)
    }
    return(
        <>
            <Header />
            <main className={styles.container}>
                <h1>Cadastrar produto</h1>

                <form onSubmit={handleRegister} className={styles.form}>
                
                    <select value={categorySelected} onChange={handleChangeCategory} >
                        {categories?.map( (item, index) => {
                        return(
                            <option key={item.id} value={index}>
                            {item.name}
                            </option>
                        )
                        })}
                    </select>

                    <input 
                    type="text"
                    placeholder="Digite o nome do produto"
                    className={styles.input}
                    value={name}
                    onChange={ (e) => setName(e.target.value) }
                    />

                    <input 
                    type="text"
                    placeholder="Preço do produto"
                    className={styles.input}
                    value={price}
                    onChange={ (e) => setPrice(e.target.value) }
                    />      

                    <textarea 
                    placeholder="Descreva seu produto..."
                    className={styles.input}
                    value={description}
                    onChange={ (e) => setDescription(e.target.value) }
                    /> 

                    <button className={styles.buttonAdd} type="submit">
                        Cadastrar  
                    </button>   
                </form>
            </main>
        </>
    )
}

async function getCategory() {
    const response = await api.get('/category');    
    return response.data;
}

export default ProductsScreem;
