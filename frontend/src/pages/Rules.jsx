import { useNavigate } from "react-router-dom";

function Rules() {
  const navigate = useNavigate();

  return (
    <div className="text-white w-full h-screen flex flex-col items-center justify-center bg-black">
      {/* Rules Heading */}
      <h2 className="text-3xl font-bold mb-6">📜 Quiz Rules</h2>

      {/* Rules List */}
      <ul className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4 text-lg">
        <li className="flex items-center gap-2">
          ✅ Each question must be answered within the given time.
        </li>
        <li className="flex items-center gap-2">
          ⏱️ If a question is not answered, the answer will be automatically submitted.
        </li>
        <li className="flex items-center gap-2">
          There will be two input areas: <br></br>
          💻 One for submitting code. <br></br>
          ▶️One for running the code.
        </li>
        <li className="flex items-center gap-2">
          ⚠️ Do not switch tabs or reload the page.
        </li>
      </ul>

      {/* Start Button */}
      <button
        onClick={() => navigate("/quiz")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        🚀 Start the Quiz
      </button>
    </div>

  );
}

export default Rules;
