import express from 'express';
import Task from '../models/taskModel';
import User from '../models/userModel';

export const viewTasks = async (req: express.Request, res: express.Response) => {
  const user = req.user || req.body;
  const id = user?.id;

  try {
    const user = await User.findById(id).populate({
      path: 'profile',
      populate: { path: 'tasks' }
    });

    return res.status(200).json({ message :"sucessfully fetch tasks" ,data : user});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
}



export const updateTaskStatus = async (req: express.Request<{id : string}>, res: express.Response) => {
  const taskId = req.params.id;
  const user = req.user || req.body;
  console.log(user);
  const id = user.profile;
  console.log(id);
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
   
    if(task?.profileId.toString() != id.toString()){
      return res.status(404).json({ message: 'Unable to update Task' });
    }
   

    task.status = 'completed'; // You can customize this as needed
    await task.save();

    return res.status(200).json({ message: 'Task status updated',data : task});
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred' });
  }
}


