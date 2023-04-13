import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddStudent from "../components/AddStudent";
import StudentList from "../components/StudentList";
import '../styles/Student.css'

function Students() {
    const [studentId, setStudentId] = useState("");

    const getStudentIdHandler = (id) => {
        setStudentId(id);
    };
    return (
        <>
        <Container name='addstudent'>
            <Row>
                <Col>
                    <AddStudent id={studentId} setStudentId={setStudentId} />
                </Col>
            </Row>
        </Container>
            <Container name='studentlist'>
                <Row>
                    <Col>
                        <StudentList getStudentId={getStudentIdHandler} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Students;