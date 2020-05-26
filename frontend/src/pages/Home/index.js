import React, { useState } from 'react';

import { FiSearch, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Menu from '../../components/Menu';
import Topping from '../../components/Topping';
import Dough from '../../components/Dough';
import Cart from '../../components/Cart';
import Payment from '../../components/Payment';

import "./styles.css";

export default function Home() {

    const [step, setStep] = useState(1);
    const [size, setSize] = useState('');
    const [dough, setDough] = useState('');

    function changeStep(step) {
        setTimeout(() => {
            setStep(step);
        },400)
    }

    function back() {
        setStep(step-1);
    }

    function next() {
        setStep(step+1);
    }

    return (
        <div className="container">
          
            <Header />
            <Hero />

             {
                step === 3 &&
                <div className="box mt-20">
                    <FiSearch className="icon-search" />
                    <input type="text" placeholder="Digite o que deseja" className="input-search"/>
                </div>
            }

            <section className="menu-content">
                
                {step > 1 && step !== 4 &&
                    <FiArrowLeft size={30} className="arrow-control arrow-left" onClick={back} />
                }

                {

                ( (size) && step === 1) && 
                    <FiArrowRight size={30} className="arrow-control arrow-right" onClick={next} />  
                }
         
                <div className="item-content box">
                    <Menu step={step} set={setSize} action={changeStep} />
                    <Dough step={step} set={setDough} action={changeStep} />
                    <Topping step={step} details={{size, dough}}/>
                </div>
                
                <div className="right-content"> 
                    <Cart />
                    <Payment />
                </div>
            </section>
        </div>
    )
}
