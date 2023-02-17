import React from 'react';
import {table} from "../helpers/table"
import tableItem from "../components/tableItem";

function Students() {
    return (
        <div className="students">
            <h1>Students</h1>
            <div className="tables">
                {table.map((tableItems, key)=>{
                    return <tableItem id={tableItems.id}
                                      name={tableItems.name}
                                      gender={tableItems.Gender}
                                      grade1={tableItems.Grade1}
                                      grade2={tableItems.Grade2}/>
                })}
            </div>
        </div>
    );
}

export default Students;