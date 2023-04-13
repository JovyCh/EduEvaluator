import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import StudentDataService from "../services/student.services";

const StudentList = ({ getStudentId }) => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        const data = await StudentDataService.getAllStudents();
        setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


    return (
        <>

            <Table className="gridtable" striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Student Number</th>
                    <th>Grade 1</th>
                    <th>Grade 2</th>
                </tr>
                </thead>
                <tbody className="tbody">
                {students.map((doc, index) => {
                    return (
                        <tr key={doc.id}>
                            <td>{index + 1}</td>
                            <td>{doc.studentNum}</td>
                            <td>{doc.grade1}</td>
                            <td>{doc.grade2}</td>
                            <td>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </>
    );
};

export default StudentList;
