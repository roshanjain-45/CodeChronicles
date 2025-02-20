import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestions, submitQuiz } from "../api/api";
import CodeEditor from "../components/CodeEditor";
import { executeCode } from "../api/executeCode"; // Import executeCode

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(180*60);
    const [disqualified, setDisqualified] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const userDataRef = useRef(null);
    const submittedRef = useRef(false);
    const timerRef = useRef(null);
    const answersRef = useRef({});

    // State for running/testing code
    const [testCode, setTestCode] = useState("// Write your code here...");
    const [selectedLanguage, setSelectedLanguage] = useState("54"); // Default: C++
    const [output, setOutput] = useState("");

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        if (storedUserData) userDataRef.current = storedUserData;

        fetchQuestions().then((data) => {
            if (Array.isArray(data)) {
                setQuestions(data);
                answersRef.current = data.reduce((acc, question) => {
                    acc[question._id] = "N/A"; // Default to "N/A"
                    return acc;
                }, {});
            } else {
                console.error("Error fetching questions:", data);
            }
        });

        // Start countdown timer
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    handleSubmit(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Detect tab switching for disqualification
        const handleVisibilityChange = () => {
            if (document.hidden) {
                alert("Disqualified! You switched tabs.");
                setDisqualified(true);
                clearInterval(timerRef.current);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("contextmenu", (e) => e.preventDefault());

        document.addEventListener("keydown", (e) => {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
                alert("Cheating detected! You have been disqualified.");
                setDisqualified(true);
                clearInterval(timerRef.current);
            }
        });

        return () => {
            clearInterval(timerRef.current);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("contextmenu", () => { });
            document.removeEventListener("keydown", () => { });
        };
    }, []);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleCodeChange = (code) => {
        const currentQuestionId = questions[currentQuestionIndex]?._id;
        if (!currentQuestionId) return;
        setAnswers((prev) => ({
            ...prev,
            [currentQuestionId]: code || "N/A",
        }))
        answersRef.current[currentQuestionId] = code || "N/A";
    };

    const handleSubmit = async (isAutoSubmit = false) => {
        if (submittedRef.current) return;
        submittedRef.current = true;
        setIsSubmitting(true);

        if (disqualified) {
            alert("You were disqualified! Submission not allowed.");
            return;
        }

        clearInterval(timerRef.current);

        const userData = userDataRef.current || { name: "Anonymous", department: "N/A", semester: "N/A", year: "N/A", contact: "N/A" };

        // const submissionData = {
        //     ...userData,
        //     answers: questions.map((q) => ({
        //         questionId: q._id,
        //         answer: answersRef.current[q._id] || "N/A",
        //     })),
        // };


        //     try {
        //         console.log("Submitting Data:", submissionData);
        //         const result = await submitQuiz(submissionData);
        //         alert(result.message);
        //         navigate("/submission-success");
        //     } catch (error) {
        //         console.error("Error submitting quiz:", error);
        //     }
        // };


        // Updated
        setTimeout(() => {
            const submissionData = {
                ...userData,
                answers: Object.keys(answersRef.current).map((questionId) => ({
                    questionId,
                    answer: answersRef.current[questionId] || "N/A",
                })),
            };

            console.log("Submitting Data:", submissionData);
            submitQuiz(submissionData).then((result) => {
                alert(result.message);
                navigate("/submission-success");
            }).catch((error) => {
                console.error("Error submitting quiz:", error);
            });
        }, 100);
    };


    const handleRunCode = async () => {
        setOutput("Running... ⏳");
        try {
            const result = await executeCode(testCode, selectedLanguage);
            setOutput(result);
        } catch (error) {
            setOutput("Error running code.");
        }
    };

    if (questions.length === 0) return <p>Loading questions...</p>;
    if (disqualified) return <p className="text-white">You have been disqualified due to tab switching.</p>;

    return (
        <div className="text-white bg-black w-full h-screen p-6 flex gap-6">
        {/* Submission Code Editor */}
        <div className="w-1/2 p-6 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">✍️ Submit Your Answer</h2>
          <h3 className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</h3>
          <h3 className="text-xl mt-2">{questions[currentQuestionIndex].title}</h3>
          <p className="mt-1 text-gray-300">{questions[currentQuestionIndex].description}</p>
          <h3 className="mt-3 text-red-400">⏳ Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</h3>
      
          {/* Code Editor for Answer Submission */}
          <div className="mt-4">
            <CodeEditor 
              value={answers[questions[currentQuestionIndex]._id] || ""} 
              onChange={handleCodeChange} 
            />
          </div>
      
          {/* Navigation Buttons */}
          <div className="mt-4 flex justify-between">
            <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              ⬅️ Previous
            </button>
            <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
              Next ➡️
            </button>
            {currentQuestionIndex === questions.length - 1 && (
              <button onClick={() => handleSubmit(false)} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">
                ✅ Submit
              </button>
            )}
          </div>
        </div>
      
        {/* Run & Test Code Editor */}
        <div className="w-1/2 p-6 bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">🛠️ Run & Test Code</h2>
          
          {/* Language Selection Dropdown */}
          <select 
            onChange={(e) => setSelectedLanguage(e.target.value)} 
            value={selectedLanguage} 
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none"
          >
            <option value="54">C++</option>
            <option value="50">C</option>
            <option value="62">Java</option>
            <option value="71">Python</option>
            <option value="63">JavaScript</option>
          </select>
      
          {/* Code Editor for Running & Testing Code */}
          <div className="mt-4">
            <CodeEditor value={testCode} onChange={setTestCode} language="javascript" />
          </div>
      
          {/* Run Code Button */}
          <button 
            onClick={handleRunCode} 
            className="mt-4 px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500"
          >
            🚀 Run Code
          </button>
      
          {/* Output Display */}
          <h3 className="mt-4 text-lg font-semibold">🖥️ Output:</h3>
          <pre className="bg-gray-800 p-4 rounded text-green-400">{output}</pre>
        </div>
      </div>
      
    );
};

export default Quiz;
