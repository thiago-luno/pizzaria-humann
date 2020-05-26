import React from 'react';
import { Link } from 'react-router-dom';

import { FiShoppingBag } from 'react-icons/fi';

import './styles.css';

export default function Cart(props) {

    const orders = JSON.parse(localStorage.getItem("order"));

    function orderPrice(order) {
        let total = 0;

        order.forEach(el => {
            total += parseInt(el.price);
        });

        return total.toFixed(2);
    }

    return (
        <Link className="cart" to={orders ? "pedido" : "/"}>
            <div className="box">

                <h3 className="mb-20"><FiShoppingBag /> Sua sacola</h3>

                {orders &&
                    <ul>
                        {
                            orders.map((order, index) => (
                                <li className="cart__item" key={index}>
                                    <span>
                                        &#8226; {order.title}
                                        {order.details && order.details.dough ? ` - Massa ${order.details.dough} ` : null}
                                        {order.details && order.details.size ? ` - Tamanho ${order.details.size} ` : null}
                                    </span>

                                    <p className="cart__item-price">R${order.price ? order.price : 0}</p>
                                </li>
                            ))
                        }
                        <li className="line-bottom"></li>
                        <li className="cart__item mt-20">
                            <span className="font-bold">&#8226; Total </span>
                            <span className="cart__total-price">R${orderPrice(orders)}</span>
                        </li>
                    </ul>
                }
            </div>
        </Link>
    )
}
