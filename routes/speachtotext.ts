import express from 'express';
import User from '../models/User';
import { getSocketInstanse } from '..';
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const router = express.Router()


// Route:1 auth a user
router.post('/toText', async (req: express.Request, res: express.Response) => {
  try {
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'server error' })
  }
},
)


export default router;