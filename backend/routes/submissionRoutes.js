import express from 'express';
import Submission from '../models/Submission.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const submission = new Submission(req.body);
        await submission.save();
        res.json({ message: "Submission Successful!" });
    } catch (error) {
        res.status(500).json({ message: "Submission Failed" });
    }
});

export default router;
