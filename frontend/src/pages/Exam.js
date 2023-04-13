import React, {useState} from 'react';
import "../styles/Exam.css";
function Exam(props) {
    const questions = [
        {
            questionText: ' Software is defined as ___________',
            answerOptions: [
                { answerText: 'documentation and configuration of data', isCorrect: false },
                { answerText: 'set of programs', isCorrect: false },
                { answerText: 'set of programs, documentation & configuration of data', isCorrect: true },
                { answerText: 'None of the mentioned', isCorrect: false },
            ],
        },
        {
            questionText: 'What is Software Engineering?',
            answerOptions: [
                { answerText: 'Designing a software', isCorrect: false },
                { answerText: 'Application of engineering principles to the design a software', isCorrect: true },
                { answerText: 'Testing a software', isCorrect: false },
                { answerText: 'None of the above', isCorrect: false },
            ],
        },
        {
            questionText: 'Define Agile scrum methodology',
            answerOptions: [
                { answerText: 'project management that emphasizes incremental progress', isCorrect: true },
                { answerText: 'project management that emphasizes decremental progress', isCorrect: false },
                { answerText: 'project management that emphasizes neutral progress', isCorrect: false },
                { answerText: 'project management that emphasizes no progress', isCorrect: false },
            ],
        },
        {
            questionText: 'Why do bugs and failures occur in software?',
            answerOptions: [
                { answerText: 'Because of Developers', isCorrect: false },
                { answerText: 'Because of companies', isCorrect: false },
                { answerText: 'Because of both companies and Developers', isCorrect: true },
                { answerText: 'None of the mentioned', isCorrect: false },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    return (
        <div className='exam' >
            {showScore ? (
                <div className='score-section'>
                    You scored {score} out of {questions.length}
                </div>
            ) : (
                <>
                    <div className='question-section'>
                        <div className='question-count'>
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className='question-text'>{questions[currentQuestion].questionText}</div>
                    </div>
                    <div className='answer-section'>
                        {questions[currentQuestion].answerOptions.map((answerOption) => (
                            <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Exam;