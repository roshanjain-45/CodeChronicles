import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    name: String,
    department: String,
    semester: String,
    year: String,
    contact: String,
    answers: [
        {
            questionId: mongoose.Schema.Types.ObjectId,
            answer: String
        }
    ],
    submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Submission", submissionSchema);
