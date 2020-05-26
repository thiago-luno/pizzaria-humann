import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logon from '../Logon';
import logoImg from '../../assets/logo.png';

import { FiLogOut } from 'react-icons/fi';

import './styles.css';

export default function Header() {

    const hora = new Date().getHours();

    const [openModal, setOpenModal] = useState(false);
    const [user, setUser] = useState(localStorage.getItem("user"));

    useEffect(() => {
        setUser(localStorage.getItem("user"))
    }, [openModal])

    function handleOpenModal() {
        setOpenModal(true);
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    function logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(undefined);
    }

    return (
        <header className="header">
            <Link to="/">
                <img src={logoImg} alt="Pizzaria" className="header__logo" />
            </Link>

            <div>
                {
                    (hora >= 18 && hora <= 24) ?
                        <span className="alert">Aberto agora</span> :
                        <span className="alert">Fechado agora</span>
                }
            </div>

            <div className="header__login">
                {!user ?
                    <ul>
                        <li><Link to="cadastro">Criar conta</Link></li>
                        <li><a onClick={handleOpenModal}>Login</a></li>
                    </ul>

                    :

                    <ul>
                        <li><span className="font-bold">{user}</span></li>
                        <li><a onClick={logout}><FiLogOut size={20}/> </a></li>
                    </ul>
                }
            </div>

            <Logon visible={openModal} hidden={handleCloseModal} />

        </header>
    )
}
