import mongoose, { Document } from 'mongoose';
import Task from './taskModel';
interface Profile extends Document {
    name: string;
    department: string;
    tasks: Task[];
    // Other profile-related fields
}
const profileSchema = new mongoose.Schema<Profile>({
    name: { type: String, required: true, default: null },
    department: { type: String, required: true, default: null },
    tasks: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Task'
        },
    ],

},{ timestamps: true});


const Profile = mongoose.model<Profile>('Profile', profileSchema);

export default Profile;
