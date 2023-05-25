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
    let List=await AlertHistory.find().limit(7).skip((req.body.page - 1) * 7) as Array<{OutputType: string; Date: Date; Content: string; DeviceID: string; Location: string;}>
    return res.json({ status: true, List: List })
  } catch (error) {
    console.log(error)
    AdminLogs.create({Type:'Error',Message:error,Address:'AlertHistory get'})
    return res.status(500).json({ error: 'server error' })
  }
},
)
router.post('/GetHistoryLength', async (req: express.Request, res: express.Response) => {
  try {
    let List = await AlertHistory.find()
    console.log(List.length)
    return res.json({ status: true, length: List.length })
  } catch (error) {
    console.log(error)
    AdminLogs.create({Type:'Error',Message:error,Address:'Reminder get'})
    return res.status(500).json({ error: error, status: false })
  }
},
)

router.post('/GetAdminLogs', async (req: express.Request, res: express.Response) => {
  try {
    let List = await AdminLogs.find().limit(7).skip((req.body.page - 1) * 7) as Array<{ Date: Date; Type: string; Message: string; Address: string;}>
    return res.json({ status: true, List: List })
  } catch (error) {
    console.log(error)
    AdminLogs.create({ Type: 'Error', Message: error, Address: 'AlertHistory get' })
    return res.status(500).json({ error: 'server error' })
  }
},
)
router.post('/GetAdminLogsLength', async (req: express.Request, res: express.Response) => {
  try {
    let List = await AdminLogs.find()
    return res.json({ status: true, length: List.length })
  } catch (error) {
    console.log(error)
    AdminLogs.create({Type:'Error',Message:error,Address:'Reminder get'})
    return res.status(500).json({ error: error, status: false })
  }
},
)

export default router;
