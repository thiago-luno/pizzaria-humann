import React from 'react';

import { FiCreditCard } from 'react-icons/fi';

export default function Payment() {
    return (
        <div className="mt-20">
            <div className="box">
                <h3><FiCreditCard  className="v-align-botton"/> Formas de pagamento</h3>
            </div>

            <div className="box">
                <h3 className="font-small">Crédito</h3>

                <ul className="list-payment">
                    <li>
                        <img src={require('../../assets/cre_americanexpress.jpg')}></img>
                    </li>

                    <li>
                        <img src={require('../../assets/cre_elo.jpg')}></img>
                    </li>

                    <li>
                        <img src={require('../../assets/cre_hiper.jpg')}></img>
                    </li>

                    <li>
                        <img src={require('../../assets/cre_master.jpg')}></img>
                    </li>

                    <li>
                        <img src={require('../../assets/cre_visa.jpg')}></img>
                    </li>
                </ul>
            </div>

            <div className="box">
                <h3 className="font-small">Débito</h3>

                <ul className="list-payment">
                    <li>
                        <img src={require('../../assets/cre_elo.jpg')}></img>
                    </li>
                    <li>
                        <img src={require('../../assets/cre_master.jpg')}></img>
                    </li>

                    <li>
                        <img src={require('../../assets/cre_visa.jpg')}></img>
                    </li>
                </ul>
            </div>

            <div className="box">
                <h3 className="font-small">Dinheiro</h3>

                <ul className="list-payment">
                    <li>
                        <img src={require('../../assets/dinheiro.jpg')}></img>
                    </li>
                </ul>
            </div>
        </div>
    )
}
