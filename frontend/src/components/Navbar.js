import React, {useState} from 'react'
import logo from '../assets/eduevalicon.png'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import ReorderIcon from "@material-ui/icons/Reorder";
import {signOut} from "firebase/auth";
import {auth} from "../firebase";
function Navbar(){

    const [openLinks, setOpenLinks] = useState(false);
    const toggleNavbar = () => {
      setOpenLinks(!openLinks);
    }

    return(
        <div className="navbar">
            <div className="leftSide" id={openLinks ? "open" : "close"}>
                <img src={logo} alt={logo}/>
                <div className="hiddenLinks">
                    <Link to="/">Home </Link>
                    <Link to="/student">Students </Link>
                    <Link to="/grades">Grades </Link>
                    <Link to="/predict">Prediction </Link>
                    <Link to="/exam">Exam </Link>
                </div>
            </div>

            <div className="rightSide">
                <Link to="/">Home </Link>
                <Link to="/student">Students </Link>
                <Link to="/grades">Grades </Link>
                <Link to="/predict">Prediction </Link>
                <Link to="/exam">Exam </Link>
                <span onClick={() => signOut(auth)}>Sign Out</span>
                <button onClick={toggleNavbar}>
                    <ReorderIcon/>
                </button>
            </div>
        </div>
    )
}

export default Navbar