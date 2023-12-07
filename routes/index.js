var express = require('express');
var router = express.Router();
const upload = require('../components/helper/upload');
router.post('/upload-file',[upload.single('image')],async (req,res,next)=>{
  //const path = req.file.path.replace('public','');
  return res.json({path:'http://localhost:8686/images/'+req.file.filename});

})




/**
 * (req, res, next)
 * res: respone
 *  res.send('hello')
 *  res.render(); hiện lên trag web
 *  res.json() trả về dữ liệu dạng JSON
 * 
 * 
 * req: request
 *   +req.query lấy tham số từ URL
 *   +req.body lấy tham số từ body
 *   +req.params //lấy ra tham số trên URL
 */
module.exports = router;
