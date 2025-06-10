import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestions, submitQuiz } from "../api/api";
import CodeEditor from "../components/CodeEditor";
import { executeCode } from "../api/executeCode"; // Import executeCode

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 minutes
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

        // 🚨 Detect tab switch for disqualification
        const handleVisibilityChange = () => {
            if (document.hidden) {
                alert("🚨 Disqualified! You switched tabs.");
                setDisqualified(true);
                clearInterval(timerRef.current);
            }
        };

        // // 🚨 Detect application switch (blur event)
        // const handleBlur = () => {
        //     alert("🚨 Disqualified! You switched applications.");
        //     setDisqualified(true);
        //     clearInterval(timerRef.current);
        // };

        // 🚨 Detect inspect element (F12, Ctrl+Shift+I)
        const handleKeyDown = (e) => {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
                alert("🚨 Cheating detected! You have been disqualified.");
                setDisqualified(true);
                clearInterval(timerRef.current);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        // window.addEventListener("blur", handleBlur);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            clearInterval(timerRef.current);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            // window.removeEventListener("blur", handleBlur);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${String(secs).padStart(2, "0")}`;
    };

    const handleSubmit = async () => {
        if (submittedRef.current) return;
        submittedRef.current = true;
        setIsSubmitting(true);

        const userData = userDataRef.current || { name: "Anonymous", department: "N/A", semester: "N/A", year: "N/A", contact: "N/A" };

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

    if (questions.length === 0) return <p className="text-white">Loading questions...</p>;
    if (disqualified) return <p className="text-white">🚨 You have been disqualified due to tab/application switch or inspection.</p>;

    return (
        <div className="text-white bg-black w-full min-h-screen p-6 flex flex-col md:flex-row gap-6">
            {/* Submission Code Editor */}
            <div className="w-full md:w-1/2 p-6 bg-gray-900 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">✍️ Submit Your Answer</h2>
                <h3 className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</h3>
                <h3 className="text-xl mt-2">{questions[currentQuestionIndex].title}</h3>
                <p className="mt-1 text-gray-300">{questions[currentQuestionIndex].description}</p>

                {/* Timer - Visible at All Times */}
                <h3 className="mt-3 text-red-400 text-lg font-bold">⏳ Time Left: {formatTime(timeLeft)}</h3>

                {/* Show Pattern If Available */}
                {questions[currentQuestionIndex].pattern && (
                    <pre className="bg-gray-800 text-white p-4 rounded-lg mt-2">
                        {questions[currentQuestionIndex].pattern.join("\n")}
                    </pre>
                )}

                {/* Show Sample Input & Output If Available */}
                {questions[currentQuestionIndex].sample_input && (
                    <div className="mt-3">
                        <h4 className="text-yellow-300">📝 Sample Input:</h4>
                        <pre className="bg-gray-800 text-white p-2 rounded">{questions[currentQuestionIndex].sample_input}</pre>
                    </div>
                )}
                {questions[currentQuestionIndex].sample_output && (
                    <div className="mt-3">
                        <h4 className="text-green-300">📤 Sample Output:</h4>
                        <pre className="bg-gray-800 text-white p-2 rounded">
                            {Array.isArray(questions[currentQuestionIndex].sample_output)
                                ? questions[currentQuestionIndex].sample_output.join("\n")
                                : questions[currentQuestionIndex].sample_output}
                        </pre>
                    </div>
                )}
                {/* Code Editor for Answer Submission */}
                <div className="mt-4">
                    <CodeEditor value={answers[questions[currentQuestionIndex]._id] || ""} onChange={(code) => {
                        answersRef.current[questions[currentQuestionIndex]._id] = code || "N/A";
                        setAnswers((prev) => ({ ...prev, [questions[currentQuestionIndex]._id]: code || "N/A" }));
                    }} />
                </div>
                {/* Next, Previous, and Submit Buttons */}
                <div className="mt-4 flex justify-between">
                    <button onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                        disabled={currentQuestionIndex === 0}
                        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                    >
                        ⬅️ Previous
                    </button>
                    {currentQuestionIndex === questions.length - 1 && (
                        <button onClick={handleSubmit} className="px-6 py-3 bg-green-600 rounded hover:bg-green-500 text-lg">
                            ✅ Submit Answers
                        </button>
                    )}
                    <button onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                        disabled={currentQuestionIndex === questions.length - 1}
                        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                    >
                        Next ➡️
                    </button>
                    
                </div>
            </div>
            <div className="w-full md:w-1/2 p-6 bg-gray-900 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">🛠️ Run & Test Code</h2>
                <select onChange={(e) => setSelectedLanguage(e.target.value)} value={selectedLanguage} className="w-full p-2 bg-gray-800 border border-gray-600 rounded focus:outline-none">
                    <option value="54">C++</option>
                    <option value="50">C</option>
                    <option value="62">Java</option>
                    <option value="71">Python</option>
                    <option value="63">JavaScript</option>
                </select>

                <div className="mt-4">
                    <CodeEditor value={testCode} onChange={setTestCode} language="javascript" />
                </div>

                <button onClick={handleRunCode} className="mt-4 px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500">🚀 Run Code</button>

                <h3 className="mt-4 text-lg font-semibold">🖥️ Output:</h3>
                <pre className="bg-gray-800 p-4 rounded text-green-400">{output}</pre>
            </div>
        </div>
    );
};

export default Quiz;
