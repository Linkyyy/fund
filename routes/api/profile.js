const express = require("express");
const router = express.Router();
const passport =require("passport");
const Profile = require("../../models/Profile");

//@route GET api/profile/test
//@desc 测试接口
//@access public
router.get("/test", (req, res) => {
    res.json({ msg: "profile works" })
})

//@route POST api/profile/add
//@desc 创新信息接口
//@access Private
router.post("/add",passport.authenticate("jwt",{session:false}), (req, res) => {
    const profileFields={};
    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.desc) profileFields.desc=req.body.desc;
    if(req.body.income) profileFields.income=req.body.income;
    if(req.body.expand) profileFields.expand=req.body.expand;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;

    new Profile(profileFields).save().then(profile=>{
        res.json(profile)
    })

})

//@route POST api/profile/
//@desc 获取所有信息
//@access Private
router.get("/",passport.authenticate("jwt",{session:false}), (req, res) => {
    Profile.find().then(profile=>{
        if(!profile) return res.status(400).send("没有任何内容");
        res.json(profile);
    })
    .catch(err => res.status(404).json(err))

})

//@route POST api/profile/:id
//@desc 获取单个信息
//@access Private
router.get("/:id",passport.authenticate("jwt",{session:false}), (req, res) => {
    Profile.findOne({_id:req.params.id}).then(profile=>{
        if(!profile) return res.status(400).send("没有任何内容");
        res.json(profile);
    })
    .catch(err => res.status(404).json(err))

})

//@route POST api/profile/edit/:id
//@desc 编辑信息
//@access Private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}), (req, res) => {
    const profileFields={};
    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.desc) profileFields.desc=req.body.desc;
    if(req.body.income) profileFields.income=req.body.income;
    if(req.body.expand) profileFields.expand=req.body.expand;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;

    Profile.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new :true}
        ).then(profile => res.json(profile))

})

//@route DELETE api/profile/delete/:id
//@desc 删除信息
//@access Private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}), (req, res) => {
    console.log(req.params.id);
    Profile.findByIdAndDelete(
        {_id:req.params.id}
        ).then(profile => res.json(profile))

})

module.exports = router;