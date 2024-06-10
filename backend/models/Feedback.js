import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;