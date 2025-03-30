import { Schema, model, Document } from "mongoose";
import reactionSchema from "./Reaction.js";

function dateFormat(timestamp: Date | null): string | undefined {
  return timestamp ? new Date(timestamp).toLocaleString() : undefined;
}

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date | string;
  username: string;
  reactions: [typeof reactionSchema];
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => dateFormat(timestamp),
  },

  username: {
    type: String,
    required: true,
  },

  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model<IThought>("Thought", thoughtSchema);

export default Thought;
