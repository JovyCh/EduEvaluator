import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import StudentDataServices from "../services/student.services";

const AddStudent= ({id, setStudentId}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [studentNum, setStudentNum] = useState("");
    const [grade1, setGrade1] = useState("");
    const [grade2, setGrade2] = useState("");
    const [attendance, setAttendance] = useState("");
    const [message, setMessage] = useState({ error: false, msg: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (name === "" || email === "" || mobile === ""  || studentNum === ""  || attendance === ""  || grade1 === ""  || grade2 === "" ) {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }
        const newStudent = {
            name,
            email,
            mobile,
            studentNum,
            attendance,
            grade1,
            grade2
        };
        console.log(newStudent);
        try {
            if (id !== undefined && id !== "") {
                await StudentDataServices.updateStudent(id, newStudent);
                setStudentId("");
                setMessage({ error: false, msg: "Updated successfully!" });
            } else {
                await StudentDataServices.addStudent(newStudent);
                setMessage({ error: false, msg: "New Student added successfully!" });
            }
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }

        setEmail("");
        setName("");
        setStudentNum("");
        setAttendance("");
        setGrade1("");
        setGrade2("");
        setMobile("");
    };
    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await StudentDataServices.getStudent(id);
            console.log("the student is :", docSnap.data());
            setName(docSnap.data().name);
            setStudentNum(docSnap.data().studentNum);
            setEmail(docSnap.data().email);
            setAttendance(docSnap.data().attendance);
            setMobile(docSnap.data().mobile)
            setGrade1(docSnap.data().grade1);
            setGrade2(docSnap.data().grade2);
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }
    };

    useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
            editHandler();
        }
    }, [editHandler, id]);
return (
    <>
        <div className="p-4 box">
            {message?.msg && (
                <Alert
                    variant={message?.error ? "danger" : "success"}
                    dismissible
                    onClose={() => setMessage("")}
                >
                    {message?.msg}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formStudentNumber">
                    <InputGroup>
                        <InputGroup.Text id="formStudentNumber">B</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Student Number"
                            value={studentNum}
                            onChange={(e) => setStudentNum(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentName">
                    <InputGroup>
                        <InputGroup.Text id="formStudentName">A</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Student Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStudentEmail">
                    <InputGroup>
                        <InputGroup.Text id="formStudentEmail">A</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Student Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formStudentAttendance">
                    <InputGroup>
                        <InputGroup.Text id="formStudentAttendance">A</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Student Attendance"
                            value={attendance}
                            onChange={(e) => setAttendance(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formStudentMobile">
                    <InputGroup>
                        <InputGroup.Text id="formStudentMobile">A</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Student Mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formStudentGrade1">
                    <InputGroup>
                        <InputGroup.Text id="formStudentGrade1">A</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Grade 1"
                            value={grade1}
                            onChange={(e) => setGrade1(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formStudentGrade2">
                    <InputGroup>
                        <InputGroup.Text id="formStudentGrade2">A</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Grade 2"
                            value={grade2}
                            onChange={(e) => setGrade2(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="Submit">
                        Add/ Update
                    </Button>
                </div>
            </Form>
        </div>
    </>
);
};

export default AddStudent;