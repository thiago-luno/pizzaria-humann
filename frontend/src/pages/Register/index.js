import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import MaskedInput from "react-input-mask";
import Header from '../../components/Header';

import api from '../../services/api';

import './styles.css';

export default function Register() {

    const { register, handleSubmit, watch, errors } = useForm();
    const history =  useHistory();
    
    const onSubmit = async data =>  {
        const user ={
            "email" : data.email,
            "fullname" : data.fullname,
            "phone" : data.phone,
            "password" : data.password,
        };

        try {
            const resp = await api.post('users', user);
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", resp.data.user.fullname);

            alert(`Cadastrado com sucesso`);

            history.push('/');
            
        } catch(err) {
            console.log('err', err)
            alert('Erro no cadastro, tente novamente');
        }
    }

    return (
        <div className="container">

            <Header />
 
            <div className="box mt-20">
                <h2># Faça seu cadastro</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            ref={register({ required: true })}
                            placeholder="*Digite seu email" />

                        {errors.email && <span className="form-error-validation">* Esse campo é obrigatório</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            name="fullname"
                            ref={register({
                                required: true,
                                pattern: /[A-Za-z]{3}/
                            })}
                            placeholder="*Digite seu nome completo" />

                        {errors.fullname && <span className="form-error-validation">* Esse campo é obrigatório</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="tel"
                            name="phone"
                            ref={register({
                                required: true,
                                maxLength: 11,
                                minLength: 9,

                            })}
                            placeholder="*Digite seu Telefone" />

                        {/* <MaskedInput
                            type="text"
                             name="phone"
                             ref={register({
                                required: true,
                                maxLength: 11,
                                minLength: 9,

                            })}
                            mask="999.999.999-99"
                            placeholder="*Digite seu Telefone" 
                        /> */}
                        {errors.phone && <span className="form-error-validation">* Esse campo é obrigatório</span>}
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

                    <div className="form-group">
                        <input
                            type="password"
                            name="confirm_password"
                            ref={register({
                                validate: value => value === watch("password")
                            })}
                            placeholder="*Confirme sua senha" />

                        {errors.confirm_password && <span className="form-error-validation">* As senhas não são iguais</span>}
                    </div>

                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
