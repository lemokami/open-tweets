import { model, Schema } from 'mongoose';

const tweet = new Schema(
  {
    tweet: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

export const Tweet = model('Tweet', tweet);
