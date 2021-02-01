const express = require("express");
const User = require("../../models/User");
const bcrypt=require('bcrypt')
const router = express.Router();
const gravatar=require('gravatar')
const jwt=require('jsonwebtoken')
const keys =require('../../config/keys')
const passport =require("passport")

router.get("/test", (req, res) => {
    res.json({ msg: "users works" })
})
router.post('/register', (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) res.status(400).send("邮箱已注册！")
        else {
            const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: '404'});
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                identity:req.body.identity,
                avatar
            })
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err)  console.log(err) ;
                    newUser.password=hash;
                    newUser.save().then(user=>res.json(user)).catch(err=>console.log(err));
                })
            })
           
        }
    })
})
router.post('/login',(req,res)=>{
    console.log(req.body)
    const email =req.body.email
    const password =req.body.password
    User.findOne({email}).then(user=>{
        if(!user) return res.status(404).send("用户不存在！")
        else{
            bcrypt.compare(password,user.password).then(isMatch=>{
                if(isMatch) {
                    const data={name:user.name,id:user.id,identity:user.identity};
                    jwt.sign(data, keys.privateKey, { expiresIn: 3600 }, function(err, token) {
                        res.json({
                            success:true,
                            token:'Bearer '+token
                        })
                      });
                }
                else{
                    return res.status(400).send("密码错误！")
                }
                })
        }
    })
})
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    return res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    });
})

module.exports = router;