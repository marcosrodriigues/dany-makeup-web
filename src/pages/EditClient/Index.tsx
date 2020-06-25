import React, { useState, useEffect } from 'react';

import Header from '../../components/Header/Index';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import FormBanner from '../../components/FormBanner/Index';
import FormClient from '../../components/FormClient/Index';

const EditClient = () => {
    const { id } = useParams();

    const [client, setClient] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        if (id) {
            api.get(`users/${id}`).then(response => {
                const { user, address } = response.data;
                setClient(user);
                setAddress(address);

                console.log(user, address);
            })
        }
    }, [id])

    return (
        <div className="page">
            <Header />

            <div className="container">
                <div className="content">
                    <div className="row">
                        <div className="header">
                            <h1 className="header-title">Editar cliente</h1>
                        </div>
                    </div>
                    <div className="box-product-horizontal">
                        <FormClient client={client} address={address} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditClient;