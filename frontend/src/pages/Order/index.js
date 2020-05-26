import React, { useState, useRef, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../../services/api';
import Grow from '@material-ui/core/Grow';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Cart from '../../components/Cart';
import Payment from '../../components/Payment';
import Logon from '../../components/Logon';

import { FiHome } from 'react-icons/fi';

import './styles.css';

export default function Order(props) {
    const [openModal, setOpenModal] = useState(false);
    const [address, setAddress] = useState('');
    const [user, setUser] = useState(localStorage.getItem("user"));
    
    const history =  useHistory();
    const step = true;
    const orders = JSON.parse(localStorage.getItem("order"));
    const delivery = calcDelivery();
    const zip = useRef();
    const houseNumber = useRef();


    function handleOpenModal() {
        setOpenModal(true);
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    function calcDelivery() {
        return 0;
    }

    function orderPrice(order) {
        let subtotal = 0;
        let total = 0;

        order.forEach(el => {
            subtotal+= parseInt(el.price);
        });

        total = subtotal + delivery;

        return {"subtotal": subtotal, "total": total }
    }

    function getAddress(zip) {
        axios.get(`https://viacep.com.br/ws/${zip}/json/`)
        .then(response => {
            setAddress(response.data);
        })
    }

    function invoice(data) {
        alert(
            `
                *********SEU PEDIDO************
                Id ordem:  ${data.orderNumber}
                Cliente: ${data.orderUser.user}
                Pagamento: ${data.orderPayment}
                Valor total: R$${data.orderPrice.toFixed(2)}
            `
        )
    }

    async function setOrder() {
        if(!localStorage.getItem("token")) {
            handleOpenModal();
            return;
        }

        if(!address) {
            alert("informe o endereço");
            return
        }

        if(!houseNumber.current.value) {
            alert("informe o número da casa");
            return
        }

        const data = {
            data: new Date().getTime(),
            orderUser: {user, address} ,
            orderDetails: orders,
            orderPayment: 'dinheiro',
            orderPrice: orderPrice(orders).total
        }

        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        }
 
        try {
            const resp = await api.post('order', data, headers);
            data.orderNumber = resp.data.order;
            invoice(data);
            localStorage.removeItem('order');
            history.push('/');
                   
        } catch(err) {    
            console.log('erro', err)
            alert('Erro no cadastro, tente novamente');
        }
    }
  
    return (
        <div className="container">
            <Header />
            <Hero />

            <section className="menu-content">
                <div className="item-content box">
                    <Grow in={step}>
                        <div>
                            <h2 className="mb-20 mt-20"># Finalizar Pedido</h2>

                            <div className="box">
                                <ul>
                                    {orders.map( (order, index) => (
                                        <li key={index} className="mb-10">
                                            <p>
                                                &#8226; {order.title}  
                                                {order.details && order.details.dough ? ` - Massa ${order.details.dough} ` : null}
                                                {order.details && order.details.size ? ` - Tamanho ${order.details.size} ` : null}
                                                 - R${order.price}  
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="box">
                                <ul>
                                    <li className="mb-10"><span className="font-bold">Subtotal</span>: R${orderPrice(orders).subtotal.toFixed(2)}</li>
                                    <li className="mb-10"><span className="font-bold">Taxa de entrega</span>: {delivery === 0 ? 'Grátis' : delivery}</li>
                                    <li className="mb-10"><span className="font-bold">Total</span>: R${orderPrice(orders).total.toFixed(2)}</li>
                                </ul>
                            </div>

                            
                            <div className="box">
                                <ul>
                                    <h4 className="mb-10"><FiHome /> Endereço de entrega</h4>
                                    <div className="content-zip">
                                        <input type="text" className="input-zip" ref={zip} placeholder="informe cep para entrega"/>
                                        <button className="btn-zip" onClick={() => getAddress(zip.current.value)}>buscar</button>
                                    </div>
                                    
                                    {address &&
                                        <div className="mt-20">
                                            <p className="mt-10">{address.logradouro}, nº<input ref={houseNumber} className="input-number" type="number" /></p>
                                            <p className="mt-10">{address.bairro}</p>
                                            <p className="mt-10">{address.localidade} / {address.uf}</p>
                                        </div>
                                    }
                                </ul>
                            </div>

                            <div className="box">
                                <Link to="/" className="button-add">Adicionar mais itens</Link>
                            </div>

                            <button id="btn-order" className="button" onClick={setOrder}>Fazer pedido</button>

                            <Logon visible={openModal} hidden={handleCloseModal}/>

                        </div>
                    </Grow>
                </div>

                <div className="right-content"> 
                    <Cart />
                    <Payment />
                </div>

            </section>
        </div>
    )
}
