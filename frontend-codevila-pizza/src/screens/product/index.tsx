"use client";
import { Header } from "@/components/Header";
import styles from './style.module.scss';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/services/apiClient";
import { useRouter } from 'next/navigation';
import { FiUpload } from 'react-icons/fi';

type ItemProps = {
    id: string,
    name: string
}

interface CategoryList {
    categoryList: ItemProps[]
}

const ProductsScreem = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
  
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);
  
    const [categories, setCategories] = useState<CategoryList>();
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

        try{
          const data = new FormData();
    
          if(name === '' || price === '' || description === '' || imageAvatar === null){
            toast.error("Preencha todos os campos!");
            return;
          }
    
          data.append('name', name);
          data.append('price', price);
          data.append('description', description);
          data.append('category_id', categories[categorySelected].id);
          data.append('file', imageAvatar);
        
          await api.post('/product', data);
    
          toast.success('Cadastrado com sucesso!')
    
        }catch(err){
          toast.error("Ops erro ao cadastrar!");
          throw new Error(err);

        } finally {
            setName('');
            setPrice('');
            setDescription('')
            setImageAvatar(null);
            setAvatarUrl('');
        }
    }

    function handleChangeCategory(event){
        setCategorySelected(event.target.value)
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>){

        if(!e.target.files){
          return;
        }
    
        const image = e.target.files[0];
    
        if(!image){
          return;
        }
    
        if(image.type === 'image/jpeg' || image.type === 'image/png'){
    
          setImageAvatar(image);
          setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    
        }
    
      }
    return(
        <>
            <Header />
            <main className={styles.container}>
                <h1>Cadastrar produto</h1>

                <form onSubmit={handleRegister} className={styles.form}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={15} color="#fff" />
                        </span>

                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                        {avatarUrl && (     
                            <img 
                                className={styles.preview}
                                src={avatarUrl}
                                alt="Foto do produto" 
                                width={250}
                                height={250}
                            />
                        )}
                    </label>
                
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
