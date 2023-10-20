import mongoose, { Document } from 'mongoose';
import Profile  from './profileModel';
// interface User extends Document {
//     email: string;
//     password: string;
//     name : string;
//     department : string;
//     IsAdmin : boolean;
// }

// const userSchema = new mongoose.Schema<User>({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     name : { type: String, required: true },
//     department : { type: String },
//     IsAdmin : { type: Boolean, required: true ,default : false},
// });

// export default mongoose.model<User>('Users', userSchema);


interface User extends Document {
    email: string;
    password: string;
    profile: Profile; // Reference to Profile
    IsAdmin: boolean;
}

const userSchema = new mongoose.Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    IsAdmin : { type: Boolean, required: true ,default : false},
    profile: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Profile', 
    },
   
},{ timestamps: true});


const User = mongoose.model<User>('User', userSchema);

export default User;