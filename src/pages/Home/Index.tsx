import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Index';

import './style.css'
import api from '../../services/api';

const Home = () => {
    const [img, setImg] = useState('')
    useEffect(() => {
        async function load () {
            const { data } = await api.get('files');
            const { url } = data;
            setImg(url);
        }

        load();
    }, [])

    return (
        <div className="page">
            <Header current="" />
        </div>
    )
}

export default Home;