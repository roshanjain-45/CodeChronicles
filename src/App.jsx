import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Rules from "./pages/Rules";
import SubmissionSuccess from "./pages/SubmissionSuccess";

function App() {
    return (
        <>
        <div className="w-full h-screen bg-black">
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/submission-success" element={<SubmissionSuccess />} />
            </Routes>
        </Router>
        </div>
    </>
    );
}

export default App;
