import express from 'express';
import User from '../models/User';
import AdminLogs from '../models/AdminLogs';

const router = express.Router()

// Route:1 create a user
router.post('/CreateUser', async (req, res) => {
  try {
    let user = await User.findOne({ UserName: req.body.UserName })
    if (user == null) {
      User.create({ UserName: req.body.UserName, Password: req.body.Password, })
      AdminLogs.create({Type:'authentication',Message:''+req.body.UserName+' successfully created.'})
      AdminLogs.create({Type:'authentication',Message:''+req.body.UserName+' logged in successfully'})
      return res.json({ UserName: req.body.UserName })
    }
    else { return res.status(400).json({ Message: 'User already exist' }) }
  }
  catch (error) {
    console.log(error)
    AdminLogs.create({Type:'Error',Message:error,Address:'Create User'})
    return res.status(500).json({ error: 'server error' })
  }

},
)

// Route:2 auth a user
router.post('/Login', async (req: express.Request, res: express.Response) => {
  try {
    let user = await User.findOne({ UserName: req.body.UserName })
    if (!user) { return res.json({ Message: 'Enter correct Login Credintials' }) }
    if (req.body.Password != user.Password) { return res.json({ Message: 'Enter correct Login Credintials' }) }
    user.TimeLastLogined = new Date()
    user.save()
    const Data = { UserName: user.UserName }
    AdminLogs.create({Type:'authentication',Message:''+req.body.UserName+' logged in successfully'})
    return res.json(Data)
  } catch (error) {
    console.log(error)
    AdminLogs.create({Type:'Error',Message:error,Address:'Login'})
    return res.status(500).json({ error: 'server error' })
  }
},
)


export default router;
