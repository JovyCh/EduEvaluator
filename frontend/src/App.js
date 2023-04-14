import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home'
import Students from "./pages/Students";
import Prediction from "./pages/Prediction";
import Exam from "./pages/Exam"
import Grade from "./pages/Grade.js"
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import {Navigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {auth, db} from './firebase'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail';
import {AuthProvider} from "./pages/AuthContext";
import Login from "./pages/Login";
import Help from "./pages/Help";
import {collection, getDocs} from 'firebase/firestore'

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [timeActive, setTimeActive] = useState(false)
    const studentsRef = collection(db, "students");
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
        const getUsers = async () => {
            const data = await getDocs(studentsRef);
            setCurrentUser(data._docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getUsers()
    }, [studentsRef])
    return (
    <div className="App">
        <Router>
            <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
                <Routes>
                    <Route exact path='/' element={
                        <PrivateRoute>
                        <Navbar/>
                        <Home/>
                        <Footer/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/student' element={
                        <PrivateRoute>
                            <Navbar/>
                            <Students/>
                            <Footer/>
                        </PrivateRoute>
                    }/>

                    <Route exact path='/grades' element={
                        <PrivateRoute>
                            <Navbar/>
                            <Grade/>
                            <Footer/>
                        </PrivateRoute>
                    }/>

                    <Route exact path='/predict' element={
                        <PrivateRoute>
                            <Navbar/>
                            <Prediction/>
                            <Footer/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/exam' element={
                        <PrivateRoute>
                            <Navbar/>
                            <Exam/>
                            <Footer/>
                        </PrivateRoute>
                    }/>
                    <Route exact path='/help' element={
                        <PrivateRoute>
                            <Navbar/>
                            <Help/>
                            <Footer/>
                        </PrivateRoute>
                    }/>
                    {/*<Route path="/" exact element={<Home/>} />*/}
                    {/*<Route path="/student" exact element={<Students/>} />*/}
                    {/*<Route path="/prediction" exact element={<Prediction/>} />*/}
                    {/*<Route path="/exam" exact element={<Exam/>} />*/}
                    {/*<Route path="/grades" exact element={<Grade/>} />*/}
                    {/*<Footer/>*/}

                    <Route path="/login" element={
                        !currentUser?.emailVerified
                            ? <Login/>
                            : <Navigate to='/' replace/>
                    } />
                    <Route path="/register" element={
                        !currentUser?.emailVerified
                            ? <Register/>
                            : <Navigate to='/' replace/>
                    } />
                    <Route path='/verify-email' element={<VerifyEmail/>} />
                </Routes>
            </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
