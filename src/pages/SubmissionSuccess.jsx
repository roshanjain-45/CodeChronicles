import React from "react";
import { Link } from "react-router-dom";

const SubmissionSuccess = () => {
    return (
        <div className="text-white text-center w-full h-screen flex flex-col items-center justify-center bg-black">
            <h1 className="text-4xl font-bold text-green-500">✅ Your Answers Submitted Successfully!</h1>
            <p className="text-xl text-gray-300 mt-2">Thank you for participating in the quiz.</p>

            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
                ⬅️ Go Back to Home
            </Link>
        </div>

    );
};

export default SubmissionSuccess;
