import express from 'express';
import User from '../models/User';
import Nodes from '../models/Devices';
import AdminLogs from '../models/AdminLogs';
import AlertHistory from '../models/AlertHistory';

const router = express.Router()

// Route:1
router.post('/GetConnectedNodes', async (req: express.Request, res: express.Response) => {
  try {
    let List: Array<{ Node_ID: string, Location: string, Connection: string }> = await Nodes.find()
    return res.json({ status: true, List: List })
  } catch (error) {
    console.log(error)
    AdminLogs.create({ Type: 'Error', Message: error, Address: 'Nodes get' })
    return res.status(500).json({ error: error, status: false })
  }
},
)

router.post('/GetHistory', async (req: express.Request, res: express.Response) => {
  try {
    let List = await AlertHistory.find() as Array<{ OutputType: string; Date: Date; Content: string; DeviceID?: string | undefined; Location?: string | undefined; }>
    return res.json({ status: true, List: List })
  } catch (error) {
    console.log(error)
    AdminLogs.create({ Type: 'Error', Message: error, Address: 'AlertHistory get' })
    return res.status(500).json({ error: 'server error' })
  }
},
)

router.post('/GetAdminLogs', async (req: express.Request, res: express.Response) => {
  try {
    let List = await AdminLogs.find() as Array<{ Date: Date; Type: string; Message?: string | undefined; Address?: string | undefined;}>
    return res.json({ status: true, List: List })
  } catch (error) {
    console.log(error)
    AdminLogs.create({ Type: 'Error', Message: error, Address: 'AlertHistory get' })
    return res.status(500).json({ error: 'server error' })
  }
},
)

export default router;
