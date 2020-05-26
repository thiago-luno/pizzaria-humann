import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Product(props) {

    const { image, title, description, price, details } = props;

    function setOrder() {

        let orders = [];

        if(localStorage.getItem('order')) {
            
            let list = JSON.parse(localStorage.getItem('order'))

            list.forEach(order => {
                orders.push(order);       
            });
        }
        
        orders.push({"title" : title, "description": description, "price": price, "details": details});
        
        localStorage.setItem('order', JSON.stringify(orders));
    }

    return (
        <div className="item">
            <figure className="item__img">
                <img src={require(`../../assets/${image}`)} alt="peperoni"/>
            </figure>
            <div className="item__description">
                <h3 className="mb-20">{title}</h3>
                <p>{description}</p>
        
                <span className="item__price"><span style={{'color':"#de3334"}}>R$ </span>{price}</span>
                
                <Link to="pedido" className="button" onClick={setOrder}>Adicionar</Link>
            </div>
        </div>
    )
}
