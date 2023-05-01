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
    let List=await AlertHistory.find() as Array<{OutputType: string; Date: Date; Content: string; DeviceID?: string | undefined; Location?: string | undefined;}>
    return res.json({ status: true, List: List })
  } catch (error) {
    console.log(error)
    AdminLogs.create({Type:'Error',Message:error,Address:'AlertHistory get'})
    return res.status(500).json({ error: 'server error' })
  }
},
)


export default router;

