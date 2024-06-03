import mongoose, { Schema, model, Document, Types } from 'mongoose';

interface IReaction extends Document {
  user: Types.ObjectId;
  article: Types.ObjectId;
  type: 'like' | 'dislike';
  createdAt: Date;
}

const ReactionSchema = new Schema<IReaction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  type: { type: String, enum: ['like', 'dislike'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const Reaction = (mongoose.models.Reaction as mongoose.Model<IReaction>) || mongoose.model<IReaction>("Reaction", ReactionSchema);

export default Reaction;