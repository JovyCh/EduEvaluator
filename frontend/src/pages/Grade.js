import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import StudentList from "../components/gradetable";

function Grade(props) {
    const [studentId, setStudentId] = useState("");

    const getStudentIdHandler = (id) => {
        console.log("The ID of document to be edited: ", id);
        setStudentId(id);
    };
    return (
        <>

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

export default Grade;