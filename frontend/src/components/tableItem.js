import React from 'react';

function TableItem({name, id, gender, grade1, grade2}) {
    return (
        <div className="tableItem">
            <h1>{id}</h1>
            <p>{name}</p>
            <p>{gender}</p>
            <p>{grade1}</p>
            <p>{grade2}</p>

        </div>
    );
}

export default TableItem;