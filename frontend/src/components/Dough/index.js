import React, { useState } from 'react'
import Grow from '@material-ui/core/Grow';

export default function Dough(props) {
    
    const [selected, setSelected] = useState('');

    const setDough = props.set;
    const changeStep = props.action;

    function changeRadio(event) {
        setSelected(event.target.value);
        setDough(event.target.value);
        changeStep(3);
    } 

    if(props.step !== 2) {
        return false;
    }

    return (
        <Grow in={props.step === 2}>
            <div>
                <h2 className="mb-20 mt-20"># Escolha o tipo da massa</h2>

                <div className="item no-margin">
                    <input 
                        id="pan" 
                        type="radio"
                        value="Pan"
                        name="dough" 
                        onChange={changeRadio} 
                        checked={selected === 'Pan'} />

                    <label htmlFor="pan">
                        <span></span>
                        Massa Pan
                    </label> 

                    <figure className="item__img-secundary">
                        <img src={require(`../../assets/pizza-massa-pan.png`)} alt=""/>
                    </figure> 
                </div>

                <div className="item no-margin">
                    <input 
                        id="fina" 
                        type="radio"
                        value="Fina"
                        name="dough" 
                        onChange={changeRadio} 
                        checked={selected === 'Fina'} />
                        
                    <label htmlFor="fina">
                        <span></span>
                        Massa Fina
                    </label>

                    <figure className="item__img-secundary">
                        <img src={require(`../../assets/pizza-massa-fina.jpeg`)} alt=""/>
                    </figure>
                </div>

                <div className="item no-margin">
                    <input 
                        id="grossa" 
                        type="radio"
                        value="Grossa"
                        name="dough" 
                        onChange={changeRadio} 
                        checked={selected === 'Grossa'} />

                    <label htmlFor="grossa">
                        <span></span>
                        Massa Grossa
                    </label> 

                    <figure className="item__img-secundary">
                        <img src={require(`../../assets/pizza-massa-grossa.jpeg`)} alt=""/>
                    </figure>
                </div>
            </div>
        </Grow>
    )
}
