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

    return res.status(201).json({ status : 201,
      message: 'Task fetched successfully',
      "hasError" : false,
      data : user?.profile,
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



export const updateTaskStatus = async (req: express.Request<{id : string}>, res: express.Response) => {
  const taskId = req.params.id;
  const user = req.user || req.body;
  const id = user.profile;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(400).json({ status : 400,
        message: 'Task Not Found',
        "hasError" : true,
        data : null,
     });
    }
   
    if(task?.profileId.toString() != id.toString()){
      return res.status(400).json({ status : 400,
        message: 'Unauthourised acecss to task',
        "hasError" : true,
        data : null,
     });
    }
   

    task.status = 'completed';
    await task.save();

    return res.status(201).json({ status : 201,
      message: 'Task status updated successfully',
      "hasError" : false,
      data : task,
   });
  } catch (error) {
    return res.status(500).json({ status : 500,
      message: 'An Error occured',
      "hasError" : true,
      data : null,
   });
  }
}


