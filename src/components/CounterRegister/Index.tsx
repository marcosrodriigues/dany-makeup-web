import React from 'react';

const CounterRegister = ({ start, end, count }) => {
    return (
        <p className="right">
            Exibindo de {start} até {end} de {count} registros no total.
        </p>
    )
}

export default CounterRegister;