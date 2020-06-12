import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

interface IPropsCustomAlert {
    type?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "light" | undefined
    visible: boolean,
    header?: string,
    text?: string,
    error?: string[]
}
const CustomAlert : React.FC<IPropsCustomAlert> = ({ type, visible, header, text, error }) => {
    const [show, setShow] = useState<boolean>(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState<string>("");
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        setShow(visible);
        if (type === "success") {
            setTitle(header ? header : "Sucesso");
            setMessage(text ? text : "Informação salva com sucesso.");
        } else if (type === "danger") {
            setTitle(header ? header : "Erro");
            setMessage(text ? text : "Ocorreram os seguintes erros:");
            if (error)
                setErrors(error);
        }
    }, [type, header, text, error, visible])

    return (
        <div className="alerts">
            {show && 
                <Alert variant={type} onClose={() => setShow(false)} dismissible >
                    <Alert.Heading>{title}</Alert.Heading>
                    {message}
                    {errors && 
                        <ul>
                            {errors.map(error => (
                                <li key={error}>{String(error)}</li>
                            ))}
                        </ul>
                    }
                </Alert>   
            }
        </div>
    )
}

export default CustomAlert;