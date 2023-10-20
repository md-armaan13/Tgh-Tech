import mongoose, { Document } from 'mongoose';

interface Task extends Document {
    profileId: mongoose.ObjectId;
    description: string;
    title: string;
    dueDate: Date;
    status: 'pending' | 'completed' | 'overdue';
}

const taskSchema = new mongoose.Schema<Task>({
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'completed', 'overdue'],
        default: 'pending',
    },
},{ timestamps: true});

const Task = mongoose.model<Task>('Task', taskSchema);
export default Task;