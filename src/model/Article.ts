import mongoose, { Schema, model, Document, Types } from 'mongoose';

interface IArticle extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  comments: Types.ObjectId[];
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
  commentsCount: number; // Virtual field for comments count
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  tags: [{ type: String }],
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ArticleSchema.virtual('commentsCount').get(function () {
  return this.comments.length;
});

// export const Article = model<IArticle>('Article', ArticleSchema);

const Article = (mongoose.models.User as mongoose.Model<IArticle>) || mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;