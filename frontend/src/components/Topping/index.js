import React from 'react';
import Grow from '@material-ui/core/Grow';

import Product from '../Product';

export default function Topping(props) {
    
    if(props.step !== 3) {
        return false;
    }

    const {details} = props;

    function getPrice() {
        // isso deveria ser uma consulta ao banco para pegar o valor exato do produto
        // Fiz apenas um mock para simular o preço de acordo com o tamanho da pizza
        let price = 0;
        
        if(details.size === 'Pequena') {
            price = "24,00";
        }

        if(details.size === 'Média') {
            price = "40,00";
        }

        if(details.size === 'Grande') {
            price = "55,00";
        }

        return price;
    }
    
    return (
        <Grow in={props.step === 3}>
            <div>
                <h2 className="mb-20 mt-20"># Pizzas</h2>

                <Product 
                    image="9 - Pizza Pepperoni.png" 
                    title="Pizza Peperroni" 
                    details={details}
                    description="O sonho dos amantes de Pepperoni. Muitas fatias de pepperoni (salame especial condimentado com páprica) servidas sobre uma generosa camada de mussarela." 
                    price={getPrice()} />

                <Product 
                    image="11 - Pizza Brasileira.png" 
                    title="Pizza Brasileira" 
                    details={details}
                    description="O sonho dos amantes de Pepperoni. Muitas fatias de pepperoni (salame especial condimentado com páprica) servidas sobre uma generosa camada de mussarela." 
                    price={getPrice()} />
            </div>
        </Grow>
    )
}
