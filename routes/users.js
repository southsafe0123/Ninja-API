var express = require('express');
var router = express.Router();
const checkToken = require('../components/helper/Checktoken');
const checkRole = require('../components/helper/CheckRole')
const UserController = require('../components/users/controller');
const modelGame = require('../components/users/modelGame');
//đăng ký tài khoản
router.post('/register',  async (req, res, next) => {
 try {
  const {body}= req;
 
  await UserController.register(body);
  console.log(body)
  return res.status(200).json({message:'Đăng kí thành công'});
 } catch (error) {
  console.log(error);
  return res.status(500).json({message: error.message});
 }
});
//đăng nhập
router.post('/login',  async (req, res, next) => {
  try {
   const {body}= req;
  const abc = await UserController.login(body);
   return res.status(200).json(abc);
  } catch (error) {
    console.log(error)
   return res.status(500).json({error: error.message});
  }
 });
 router.post('/loginGame',  async (req, res, next) => {
  try {
   const {body}= req;
  const abc = await UserController.loginGame(body);
   return res.status(200).json(abc);
  } catch (error) {
   return res.status(500).json({error: error.message});
  }
 });
 //text
 router.get('/test-token',[checkToken, checkRole.checkRoleAdmin],  async (req, res, next) => {
  try {
  
  console.log(req.user);
   return res.status(200).json({message:'test thafnh cong'});
  } catch (error) {
    console.log(error)
   return res.status(500).json({error: error.message});
  }
 });
 //xác thực
 router.post('/verify/:id', async(req, res, next)=>{
try {
  const {id} = req.params;
 const result = await UserController.verify(id);
 res.status(200).json({status: result});
console.log(result)
} catch (error) {
  res.status(500).json({status: false,status: error.message})
}
 });
 //ressetpass
 router.post('/forgot-password', async(req, res, next)=>{
  try {
    const {email} = req.body;
   const result = await UserController.forgotPassword(email);
   res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
   });
   //checktokenresset
   router.post('/check-token-ressetpassword', async(req, res, next)=>{
    try {
      const {token} = req.body;
     const result = await UserController.checkTokenResetPass(token);
     res.status(200).json({status: result});
    } catch (error) {
      res.status(500).json({success: false,status: error.message})
    }
     });
     router.put('/change-password', async(req, res, next)=>{
      try {
        const {password, token} = req.body;
       const result = await UserController.changePassword(token, password);
       res.status(200).json({status: result});
      } catch (error) {
        res.status(500).json({success: false,status: error.message})
      }
       })

       //Game
router.get('/inGame/:id', async (req, res, next)=>{
  try {
    const {id} = req.params;
    const result = await UserController.getUserGame(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(result);
  }
  

})
router.get('/gameInfo/:id', async (req, res, next)=>{
  try {
    const {id} = req.params;
    const result = await UserController.gameInfo(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(result);
  }
})
router.put('/upDate/:id', async (req, res, next)=>{
  try {
    const {id} = req.params;
    const{body} = req
    console.log(body)
    const result = await UserController.upDateGame(id, body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(result);
  }
    })
module.exports = router;
