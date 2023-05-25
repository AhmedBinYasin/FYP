import express from 'express';
import User from '../models/User';
import { getSocketInstanse } from '..';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import AlertHistory from '../models/AlertHistory';
import AdminLogs from '../models/AdminLogs';

const router = express.Router()


// Route:1 auth a user
router.post('/GetHistory', async (req: express.Request, res: express.Response) => {
  try {
    let List=await AlertHistory.find().limit(5).skip((req.body.page - 1) * 10) as Array<{OutputType: string; Date: Date; Content: string; DeviceID: string; Location: string;}>
    return res.json({ status: true, List: List })
  } catch (error) {
    console.log(error)
    AdminLogs.create({Type:'Error',Message:error,Address:'AlertHistory get'})
    return res.status(500).json({ error: 'server error' })
  }
},
)


export default router;

