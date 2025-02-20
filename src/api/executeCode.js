// export const executeCode = async (sourceCode, languageId) => {
//     const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-RapidAPI-Key": "fe56bbc158mshfe736a25ec4c1d2p15ee2ajsn25750c40f887",  // 🔥 Replace with your actual Judge0 API key
//         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//       },
//       body: JSON.stringify({
//         source_code: sourceCode,
//         language_id: languageId,
//         stdin: "",  // Can be used if input is required
//       }),
//     });
  
//     const data = await response.json();
//     return data;
//   };

import axios from "axios";

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
const API_KEY = "fe56bbc158mshfe736a25ec4c1d2p15ee2ajsn25750c40f887"; // Replace with your actual RapidAPI key

export const executeCode = async (sourceCode, languageId) => {
    try {
        const { data } = await axios.post(
            `${JUDGE0_API_URL}?base64_encoded=false&wait=true`,
            {
                source_code: sourceCode,
                language_id: languageId,
            },
            {
                headers: {
                    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                    "X-RapidAPI-Key": API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        return data.stdout || data.stderr || "No output.";
    } catch (error) {
        console.error("Error executing code:", error);
        return "Error executing code.";
    }
};


  