import React, { useState, useEffect } from 'react';
import IAddress from '../../interface/IAddress';
import InputMask from 'react-input-mask';
import './style.css'
import { api_cep, api_ibge } from '../../services/api';

interface Props {
    address?: IAddress
    onInputChange?: (event: any) => void
    onAddressChange?: (address: any) => void
}
const FormAddress : React.FC<Props> = ({ 
    address,
    onInputChange,
    onAddressChange,
 }) => {

    const [addressForm, setAddressForm] = useState({
        name: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        reference: '',
        neighborhood: '',
        city: '',
        uf: '',
    })
    const [citys, setCitys] = useState([]); 
    const [ufs, setUfs] = useState([]); 

    useEffect(() => {
        if (address) {
            setAddressForm(address);
        }
    }, [address])

    useEffect(() => {
        const params = {
            orderBy: 'nome'
        }
        api_ibge.get('estados', { params }).then(response => {
            const { data } = response;

            const all_uf = data.map(({ sigla, nome }) => {
                return { sigla, nome }
            });

            setUfs(all_uf);
        })
    }, [])

    useEffect(() => {
        api_ibge.get(`estados/${addressForm.uf}/municipios`).then(response => {
            const { data } = response;

            const all_citys = data.map((city) => city.nome);
            setCitys(all_citys);
        })
    }, [addressForm.uf])

    function handleInputChange(event) {
        const { name, value } = event.target;
        setAddressForm({ ...addressForm, [name]:value })
        
        if (onInputChange)
            onInputChange(event);
    }

    async function onBlurCep() {
        const response = await api_cep.get(`${addressForm.cep}/json`);

        const {
            logradouro,
            complemento,
            bairro,
            localidade,
            uf
        } = response.data;

        const new_address = {
            ...addressForm,
            street: logradouro,
            complement: complemento,
            neighborhood: bairro,
            uf: uf,
            city: localidade,
        }

        setAddressForm(new_address)
        if (onAddressChange)
            onAddressChange(new_address)
    }

    return (
    <div className="box-address">
        <legend>
            Endereço
        </legend>
        <div className="col-sm-12">
            <div className="form-group row">
                <label htmlFor="addressName" className="form-label col-form-label col-sm-1">Nome:</label>
                <div className="col-sm-11">
                    <input 
                        type="text" 
                        id="addressName"
                        name="name"
                        placeholder="Endereço residencial, comercial..." 
                        className="form-control"
                        value={addressForm.name}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="cep" className="form-label col-form-label col-sm-1">CEP:</label>
                <div className="col-sm-2">
                    <InputMask 
                        mask="99999-999"
                        id="cep"
                        className="form-control"
                        name="cep"
                        value={addressForm.cep}
                        onChange={handleInputChange}
                        onBlur={onBlurCep}
                    />
                </div>

                <label htmlFor="street" className="form-label col-form-label col-sm-2">Logradouro:</label>
                <div className="col-sm-7">
                    <input 
                        type="text" 
                        id="street" 
                        name="street"
                        className="form-control"
                        value={addressForm.street}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="number" className="form-label col-form-label col-sm-1">Nº:</label>
                <div className="col-sm-2">
                    <input 
                        type="text" 
                        id="number" 
                        name="number"
                        className="form-control"
                        value={addressForm.number}
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="complement" className="form-label col-form-label col-sm-2">Complemento:</label>
                <div className="col-sm-3">
                    <input 
                        type="text" 
                        id="complement" 
                        name="complement"
                        className="form-control"
                        value={addressForm.complement}
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="reference" className="form-label col-form-label col-sm-1">Referência:</label>
                <div className="col-sm-3">
                    <input 
                        type="text" 
                        id="reference" 
                        className="form-control"
                        name="reference"
                        value={addressForm.reference}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="neighborhood" className="form-label col-form-label col-sm-1">Bairro:</label>
                <div className="col-sm-2">
                    <input 
                        type="text"
                        id="neighborhood" 
                        className="form-control"
                        name="neighborhood"
                        value={addressForm.neighborhood}
                        onChange={handleInputChange}
                    />
                </div>

                <label htmlFor="city" className="form-label col-form-label col-sm-2">Cidade:</label>
                <div className="col-sm-3">
                    <select 
                        id="city" 
                        className="form-control"
                        name="city"
                        value={addressForm.city}
                        onChange={handleInputChange}
                    >
                        <option disabled selected>SELECIONE O ESTADO</option>
                        {
                        citys && citys.map((city: any) => (
                            <option key={city} value={city}>{city}</option>
                        ))   
                        }
                    </select>
                </div>

                <label htmlFor="uf" className="form-label col-form-label col-sm-1">UF:</label>
                <div className="col-sm-3">
                    <select 
                        id="uf" 
                        name="uf"
                        className="form-control"
                        value={addressForm.uf}
                        onChange={handleInputChange}
                    >
                        <option disabled selected>SELECIONE O ESTADO</option>
                        {
                        ufs && ufs.map((uf: any) => (
                            <option key={uf.sigla} value={uf.sigla}>{uf.nome}</option>
                        ))   
                        }
                    </select>
                </div>
            </div>
        </div>
    </div>
    )
}

export default FormAddress;