import express from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import Profile from '../models/profileModel';
import Task from '../models/taskModel';

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}
function IsAdmin(user: User){
    return user.IsAdmin;
}
 
export const addStudent = async (req: express.Request, res: express.Response) => {
    const { name, email, department, password } = req.body;
    const user = req.user || req.body;

    if(!IsAdmin(user)){
       return res.status(400).json({ status : 400,
        message: 'You are not authorized to add student',
        "hasError" : true,
        data : null,
     });
    }
   
    try {
      const user = await User.findOne({ email });
      if(user){
        return res.status(400).json({ status : 400,
            message: 'User Already Exists',
            "hasError" : true,
            data : null,
         });
      }

      if(!name || !email || !department || !password){
         return res.status(400).json({ status : 400,
            message: 'Please fill all the fields',
            "hasError" : true,
            data : null
         });
      }
    
      const hashedPassword = await hashPassword(password);

      const newuser = await  User.create({email, password: hashedPassword});
      const profile = await Profile.create({name, department,tasks: []});
      newuser.profile = profile;
      await newuser.save();
  
      return res.status(201).json({ status : 201,
        message: 'User created successfully',
        "hasError" : false,
        data : newuser,
     });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status : 500,
            message: 'An Error occured',
            "hasError" : true,
            data : null,
         });
    }
  }


  export const assignTask = async (req: express.Request, res: express.Response) => {
    const { profileId, title, description, dueDate } = req.body;
    const user = req.user || req.body;
    if(!IsAdmin(user)){
      return res.status(400).json({ status : 400,
        message: 'You are not authorized to assign task',
        "hasError" : true,
        data : null,
     });
    }
    try {
        const student = await Profile.findById(profileId);

        if(!student){
            return res.status(400).json({ status : 400,
                message: 'student does not exist',
                "hasError" : true,
                data : null,
             });
        } else {
            const date = new Date(dueDate);
            const task = await Task.create({ profileId,title, description, dueDate: date });
            if (student.tasks) {
                student.tasks.push(task);
            } else {
                student.tasks = [task];
            }
            await student.save();

            return res.status(201).json({ status : 201,
                message: 'Task assigned successfully',
                "hasError" : false,
                data : task,
             });
        }
    } catch (error) {
        console.log(error);
        return  res.status(500).json({ status : 500,
            message: 'An Error occured',
            "hasError" : true,
            data : null,
         });
    }
  }


