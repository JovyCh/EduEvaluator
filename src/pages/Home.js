import React from 'react';
import {Link} from 'react-router-dom';
import background from '../assets/background1.jpg';
import "../styles/Home.css";
function Home(){
    return(
        <div className="home" style={{backgroundImage: `url(${background})`}}>
            <div className="headerContainer" >
                <h1>EduEvaluator</h1>
                <p>Welcome!</p>
                <Link to="/predict">
                    <button>Predict</button>
                </Link>
            </div>
        </div>
    )
}

export default Home