import express from 'express';
import Alarms from '../models/Dates';
import History from '../models/RemindersHistory';
import User from '../models/User';

const router = express.Router()


// Route:1 add
router.post('/AddNewReminder', async (req: express.Request, res: express.Response) => {
  try {
    Alarms.create({
      UserName: req.body.UserName,
      Date: new Date(req.body.Date),
      Message: req.body.Message,
      Enable: true,
    })
    return res.json({ status: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error, status: false })
  }
},
)
router.post('/UpdateReminder', async (req: express.Request, res: express.Response) => {
  try {
    let alarm = await Alarms.findOne({ UserName: req.body.UserName, Date: req.body.previous[0], Message: req.body.previous[1], })
    console.log(alarm)
    if (alarm) {
      alarm.Date = req.body.Date
      alarm.Message = req.body.Message
      alarm.save()
      return res.json({ status: true })
    }
    else {
      return res.json({ status: false, Message: 'NotFound' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error, status: false })
  }
},
)
router.post('/ReAddReminder', async (req: express.Request, res: express.Response) => {
  try {
    Alarms.create({
      UserName: req.body.UserName,
      Date: new Date(req.body.Date),
      Message: req.body.Message,
      Enable: true,
    })
    return res.json({ status: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error, status: false })
  }
},
)

router.post('/GetReminder', async (req: express.Request, res: express.Response) => {
  try {
    let List = await Alarms.find({ UserName: req.body.UserName, }).limit(5).skip((req.body.page - 1) * 5)
    return res.json({ status: true, List: List })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error, status: false })
  }
},
)
router.post('/EnableReminder', async (req: express.Request, res: express.Response) => {
  try {
    let List = await Alarms.findOne({ UserName: req.body.UserName, Date: req.body.Date, Message: req.body.Message, Enable: req.body.Enable })
    if (List != undefined) {
      List.Enable = !List.Enable
      List.save()
      return res.json({ status: true, })
    }
    else {
      return res.json({ status: false, Message: 'Not Found' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error, status: false })
  }
},
)

router.post('/GetReminderHistory', async (req: express.Request, res: express.Response) => {
  try {
    let List = await History.find({ UserName: req.body.UserName, }).limit(5).skip((req.body.page - 1) * 5)
    return res.json({ status: true, List: List })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error, status: false })
  }
},
)

router.post('/GetReminderLength', async (req: express.Request, res: express.Response) => {
  try {
    let List = await Alarms.find({ UserName: req.body.UserName, })
    return res.json({ status: true, length: List.length })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error, status: false })
  }
},
)

router.post('/GetReminderHistoryLength', async (req: express.Request, res: express.Response) => {
  try {
    let List = await History.find({ UserName: req.body.UserName, })
    return res.json({ status: true, length: List.length })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error, status: false })
  }
},
)



module.exports = router