"use client";
import { Header } from "@/components/Header";
import styles from './styles.module.scss';
import { ModalOrder } from '../../components/ModalOrder';
import { api } from "@/services/apiClient";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from 'react-icons/fi';
import Modal from 'react-modal';

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product:{
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order:{
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}


type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps{
  orders: OrderProps[];
}

export default function DashBoardScreem() {
  const [orderList, setOrderList] = useState<HomeProps>()

  const [modalItem, setModalItem] = useState<OrderItemProps[]>()
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setOrderList(await getOrders());
    };

    fetchOrders();

}, [])

  function handleCloseModal(){
    setModalVisible(false);
  }

  async function handleOpenModalView(id: string){
   
     const response = await api.get('/order/detail', {
       params:{
        order_id: id,
       } 
     })

     setModalItem(response.data);
     setModalVisible(true);

  }

  async function handleFinishItem(id: string){
    await api.put('/order/finish', {
      order_id: id,
    })

    const response = await api.get('/orders');

    setOrderList(response.data);
    setModalVisible(false);
  }


  async function handleRefreshOrders(){

    const response = await api.get('/orders')
    setOrderList(response.data);

  }

  Modal.setAppElement('#dashboard');

  return (
    <>
    <Header/>
      <main className={styles.container} id="dashboard">

        <div className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button onClick={handleRefreshOrders}>
            <FiRefreshCcw size={25} color="#3fffa3"/>
          </button>
        </div>

        <article className={styles.listOreders}>

          {orderList?.length === 0 && (
            <span className={styles.emptyList}>
              Nenhum pedido aberto foi encontrado...
            </span>
          )}

          {orderList?.map( item => (
            <section  key={item.id} className={styles.orderItem}> 
              <button onClick={ () => handleOpenModalView(item.id) }>
                <div className={styles.tag}></div>
                <span>Mesa {item.table}</span>
              </button>
            </section>
          ))}
                
        </article>

      </main>

        { modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={ handleFinishItem }
          />
        )}
    </>
  )
}

async function getOrders() {
  const response = await api.get('/orders');    
  return response.data;
}
