import express from 'express';
import User from '../models/User';

const router = express.Router()


// Route:1 auth a user
router.post('/Login', async (req: express.Request, res: express.Response) => {
  // Validate User Here
  try {
    let user = await User.findOne({ UserName: req.body.UserName })
    console.log(user)
    if (!user) {
      return res
        .json({ Message: 'Enter correct Login Credintials' })
    }
    if (req.body.Password != user.Password) {
      return res
        .json({ Message: 'Enter correct Login Credintials' })
    }
    const Data = {
      user: {
        Name: user.UserName,
      }
    }
    return res.json({ PayLoad: Data })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'server error' })
  }
},
)


module.exports = router
