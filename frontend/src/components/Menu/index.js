import React, { useState } from 'react';
import Grow from '@material-ui/core/Grow';

import Product from '../Product';

export default function Menu(props) {
    
    const [selected, setSelected] = useState('');
    
    const setSize  = props.set;
    const changeStep  = props.action;

    function changeRadio(event) {
        setSelected(event.target.value);
        setSize(event.target.value);
        changeStep(2);
    } 

    if(props.step !== 1) { 
        return false;
    }

    return (
        <Grow in={props.step === 1}>
            <div>
                <h2 className="mb-20 mt-20"># Pizzas</h2>

                <div className="item no-margin">
                    <input 
                        id="pequena" 
                        type="radio" 
                        name="size" 
                        value="Pequena" 
                        onChange={changeRadio} 
                        checked={selected === 'Pequena'} />

                    <label htmlFor="pequena">
                        <span></span>
                        Pequena 4 pedaços - 2 pessoa (24cm) <br/>
                        1 sabor
                    </label>  

                    <span className="item__price-box">
                        <span className="item__price-subtitle">a partir de</span> 
                        <br/>
                        <span className="item__price-value">R$24,00</span>
                    </span> 
                </div>

                <div className="item no-margin">
                    <input 
                        id="media" 
                        type="radio" 
                        name="size" 
                        value="Média" 
                        onChange={changeRadio} 
                        checked={selected === 'Média'} />
                    
                    <label htmlFor="media">
                        <span></span>
                        Media 8 pedaços - 4 pessoas (40cm) <br/>
                        Até 2 sabores
                    </label>

                    <span className="item__price-box">
                        <span className="item__price-subtitle">a partir de</span> 
                        <br/>
                        <span className="item__price-value">R$40,00</span>
                    </span> 
                </div>

                <div className="item no-margin">
                    <input 
                        id="grande" 
                        type="radio" 
                        name="size" 
                        value="Grande" 
                        onChange={changeRadio} 
                        checked={selected === 'Grande'} />
                        
                    <label htmlFor="grande">
                        <span></span>
                        Grande 12 pedaços - 6 pessoas (68cm) <br/>
                        Até 2 sabores
                    </label> 

                    <span className="item__price-box">
                        <span className="item__price-subtitle">a partir de</span> 
                        <br/>
                        <span className="item__price-value">R$55,00</span>
                    </span>  
                </div>

                <h2 className="mb-20 mt-20"># Bebidas</h2>
        
                <Product 
                    image="GuaranaAntarctica-Gr2l-7891991001342.png" 
                    title="Guaraná 2L" 
                    description="Água gaseificada, açúcar, extrato de guaraná, acidulante ácido cítrico, conservadores: benzoato de sódio e sorbato de potássio, aromatizante e corante caramelo IV. Não contém glúten." 
                    price="8,00" 
                    action={() => changeStep(4)}
                   />

                <Product 
                    image="Pepsi2L.png" 
                    title="Pepsi 2L" 
                    description="O refrigerante Pepsi normal possui como ingredientes aromatizantes naturais compostos, água gaseificada, açúcar, cafeína, corante de caramelo (INS 150a), extrato de Noz-de-cola e acidulante Ácido Fosfórico (INS 338)." 
                    price="9,00" 
                    action={() => changeStep(4)}
                   />
            </div>


        </Grow>

    )
}
