import React from 'react'
import "../styles/Help.css"

function Help() {
    return (
        <div className='helpdiv'>
            <div className='help'>
                <h1>Help Page</h1>
                <h2 className='titlehelp'>How to use the website</h2>
                <p className='helpText'>1. Login with your email and password</p>
                <p>2. Click on the student tab to add a student or delete them from the database</p>
                <p>3. Click on the grades tab to check on a student grade</p>
                <p>4. Click on the prediction tab to predict a student's grade</p>
                <p>5. Click on the exam tab to take an exam</p>
                <p>6. Click on the help tab to get help</p>
            </div>
        </div>
    )
}

export default Help