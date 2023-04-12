import {db} from "../firebase"
import {collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore"

const studentCollectionRef = collection(db,"students")
class StudentDataService{
    addStudent= (newStudent) =>{
        return addDoc(studentCollectionRef, newStudent);
    }

    updateStudent = (id, updateStudent) =>{
        const studentDoc = doc(db, "students", id);
        return updateStudent(studentDoc, updateStudent);
    }

    deleteStudent = (id) =>{
        const studentDoc = doc(db, "students", id);
        return deleteDoc(studentDoc)
    }

    getAllStudents = () => {
        return getDocs(studentCollectionRef);
    }

    getStudent = (id) => {
        const studentDoc = doc(db, "students", id);
        return getDoc(studentDoc);
}
}

export default new StudentDataService();