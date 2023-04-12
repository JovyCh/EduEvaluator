import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddStudent from "../components/AddStudent";
import StudentList from "../components/StudentList";

function Students() {
    const [studentId, setStudentId] = useState("");

    const getStudentIdHandler = (id) => {
        console.log("The ID of document to be edited: ", id);
        setStudentId(id);
    };
    return (
        <>
        <Container style={{ width: "400px" }}>
            <Row>
                <Col>
                    <AddStudent id={studentId} setStudentId={setStudentId} />
                </Col>
            </Row>
        </Container>
            <Container>
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