import { Schema, model, Document, Types } from 'mongoose';

const reactionSchema = new Schema(
    {
        reactionId: Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => new Date(timestamp).toLocaleString()
    }
    {
        toJSON: { getters: true },
        _id: false
    }
);

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: [typeof reactionSchema]
}

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get: (timestamp: Date) => dateFormat(timestamp)
    },

    username: {
        type: String,
        required: true
    },

    reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;