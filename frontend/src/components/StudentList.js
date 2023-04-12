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
        console.log(data.docs);
        setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const deleteHandler = async (id) => {
        await StudentDataService.deleteStudent(id);
        getStudentId();
    };
    return (
        <>

            <div className="mb-2">
                <Button variant="dark edit" onClick={getStudents}>
                    Refresh List
                </Button>
            </div>

            {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Student Number</th>
                    <th>Student Mobile</th>
                    <th>Student Email</th>
                    <th>Student Attendance</th>
                    <th>Grade 1</th>
                    <th>Grade 2</th>
                </tr>
                </thead>
                <tbody>
                {students.map((doc, index) => {
                    return (
                        <tr key={doc.id}>
                            <td>{index + 1}</td>
                            <td>{doc.name}</td>
                            <td>{doc.studentNum}</td>
                            <td>{doc.mobile}</td>
                            <td>{doc.email}</td>
                            <td>{doc.attendance}</td>
                            <td>{doc.grade1}</td>
                            <td>{doc.grade2}</td>
                            <td>
                                <Button
                                    variant="secondary"
                                    className="edit"
                                    onClick={(e) => getStudentId(doc.id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className="delete"
                                    onClick={(e) => deleteHandler(doc.id)}
                                >
                                    Delete
                                </Button>
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
