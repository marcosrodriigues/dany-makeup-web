import React, { useState } from 'react';

import './style.css';
import GifLoading from '../../components/GifLoading/Index';
import api from '../../services/api';

const Login = ({ history }) => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    const [loading, isLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm(f => { return { ...f, [name]: value }})
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (loading) return;

        const credentials = JSON.stringify(form);

        isLoading(true);
        try {
            await api.post('manager/auth', { credentials });
            localStorage.setItem('IS_AUTHENTICATED', 'true');
            history.push('/dashboard')
        } catch (err) {
            alert('Login e/ou senha inválidos');
        };
        isLoading(false);
    }

    return (
        <div className="fullscreen">
            <div className="box-login">
                <div className="img-content">
                    <img src={require('../../assets/bg_icon.png')} alt="DANY MAKEUP" />
                </div>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" 
                            placeholder="usuario"
                            name="username"
                            className="form-control input-login"
                            onChange={handleChange}
                            value={form.username}
                            required />

                        <input type="password" 
                            placeholder="senha"
                            name="password"
                            className="form-control input-login"
                            onChange={handleChange}
                            value={form.password}
                            required />
                            
                        {loading ? <GifLoading /> :
                            <button type="submit" className="btn-login">Login</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;