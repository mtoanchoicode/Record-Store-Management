const md5 = require("md5")

const Account = require("../../models/account.model")
const Role = require("../../models/role.models")

const systemConfig = require("../../config/system")

// [GET] /admin/account/index

module.exports.index = async(req, res)=>{

    let find = {
        deleted: false
    }

    const records = await Account.find(find).select("-password -token")

    for (const record of records){
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        })
        record.role = role
    }

    res.render("admin/pages/accounts/index", {
        pageTitle: "Accounts List",
        records: records
    });
}

// [GET] /admin/account/create

module.exports.create = async(req, res)=>{
    const roles = await Role.find({
        deleted:false
    })

    res.render("admin/pages/accounts/create", {
        pageTitle: "Create New Account",
        roles: roles
    });
}

// [POST] /admin/account/create

module.exports.createPost = async(req, res)=>{
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    })

    if(emailExist){
        req.flash("error", `Email ${req.body.email} already exist`)
        res.redirect("back")
    }else{
        req.body.password = md5(req.body.password)

        const record = new Account(req.body)
        await record.save();
    
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }

}

// [GET] /admin/account/edit/:id

module.exports.edit = async(req, res)=>{
    let find = {
        _id: req.params.id,
        deleted: false
    }
    try{
        const data = await Account.findOne(find)

        const roles = await Role.find({
            deleted: false
        })
        
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Edit Account",
            data: data,
            roles: roles
        });
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }

}

// [PATCH] /admin/account/create

module.exports.editPatch = async(req, res)=>{
    const id = req.params.id
    const emailExist = await Account.findOne({
        _id: {$ne: id},
        email: req.body.email,
        deleted: false
    })
    if (emailExist){
        req.flash("error", `Email ${req.body.email} already exist`)
    }else{

        if(req.body.password){
            req.body.password = md5(req.body.password)
        }else{
            delete req.body.password
        }
        await Account.updateOne({_id: id}, req.body)

        req.flash("success", `Update Complete`)
    }
    res.redirect("back")
}