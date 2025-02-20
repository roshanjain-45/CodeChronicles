import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
    testCases: [
        {
            input: String,
            output: String,
        }
    ],
    difficulty: String,
    languageSupport: [String]
});

export default mongoose.model("Question", questionSchema);
