import { Router } from 'express';
import Feedback from "../models/Feedback.js";
import axios from 'axios';

const router = Router();

const sendFeedbackToFrill = async (feedbackData) => {
  try {
    const response = await axios.post('https://api.frill.co/v1/feedback', feedbackData, {
      headers: {
        'Authorization': `Bearer ${process.env.FRILL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Feedback sent to Frill:', response.data);
  } catch (error) {
    console.error('Error sending feedback to Frill:', error.response?.data);
  }
};

router.post('/feedback', async (req, res) => {
  try {
    const { category, rating, comments, userId } = req.body;
    const feedback = new Feedback({
      category,
      rating,
      comments,
      user: userId,
    });

    await feedback.save();
    await sendFeedbackToFrill(feedback.toObject());

    res.status(201).send(feedback);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
