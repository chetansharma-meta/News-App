import mongoose, { Schema, model, Document, Types } from 'mongoose';

interface IComment extends Document {
  content: string;
  user: Types.ObjectId;
  article: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Comment = (mongoose.models.Comment as mongoose.Model<IComment>) || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;