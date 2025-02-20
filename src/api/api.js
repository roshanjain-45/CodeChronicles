const API_BASE = "http://localhost:5000/api";

export const fetchQuestions = async () => {
    const response = await fetch(`${API_BASE}/quiz/questions`);
    return response.json();
};

export const submitQuiz = async (data) => {
    const response = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
};
