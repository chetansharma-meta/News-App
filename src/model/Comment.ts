import { Schema, model, Document, Types } from 'mongoose';

interface IComment extends Document {
  content: string;
  author: Types.ObjectId;
  article: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Comment = model<IComment>('Comment', CommentSchema);