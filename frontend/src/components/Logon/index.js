import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useForm } from "react-hook-form";
import { FiXCircle } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function Login(props) {
    const classes = useStyles();

    let { visible, hidden } = props;

    const history =  useHistory();
    
    const { register, handleSubmit, watch, errors } = useForm();

    const [modalStyle] = React.useState(getModalStyle);

    const handleClose = () => {
        hidden();
    };

    const onSubmit = async data => {

        const user = {
            "email": data.email,
            "password": data.password,
        };

        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json'
        }

        try {
            const resp = await api.post('login', user, headers);
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", resp.data.user.fullname);
            handleClose();
            
        } catch(err) {
            console.log('err', err)
        
            alert('Erro no login, tente novamente');
        }
    }

    return (

        <Modal
            open={visible}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <FiXCircle className="close" size={24} onClick={handleClose} />
                <h3># Faça seu login</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            ref={register({ required: true })}
                            placeholder="*Digite seu email" />

                        {errors.name && <span className="form-error-validation">* Esse campo é obrigatório</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            ref={register({
                                required: "Esse campo é obrigatório",
                                minLength: {
                                    value: 6,
                                    message: "Password precisa ter no minímo 6 caracteres"
                                }
                            })}

                            placeholder="*Digite sua senha" />

                        {errors.password && <span className="form-error-validation">*{errors.password.message}</span>}
                    </div>

                    <button className="button">Entrar</button>
                </form>
            </div>
        </Modal>

    );
}