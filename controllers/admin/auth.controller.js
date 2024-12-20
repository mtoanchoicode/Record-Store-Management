const md5 = require("md5")

const Account = require("../../models/account.model")

const systemConfig = require("../../config/system")

// [GET] /admin/auth/login

module.exports.login = async (req, res)=>{
    if(req.cookies.token){
        const user = await Account.findOne({token: req.cookies.token})
        if(!user){
            res.render("admin/pages/auth/login", {
                pageTitle: "Login Page"
            })
        }else{
            res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
        }
    }else{
        res.render("admin/pages/auth/login", {
            pageTitle: "Login Page"
        });
    }

}

// [POST] /admin/auth/login

module.exports.loginPost = async (req, res)=>{
    const {email, password} = req.body
    const user = await Account.findOne({
        email:email,
        deleted: false
    })

    if(!user){
        req.flash("error", "Email not exist")
        res.redirect("back")
        return;
    }

    if(md5(password) != user.password){
        req.flash("error", "Wrong password")
        res.redirect("back")
        return;
    }

    if(user.status != "active"){
        req.flash("error", "Account has been disabled")
        res.redirect("back")
        return;
    }
    res.cookie("token", user.token)
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

// [GET] /admin/auth/logout

module.exports.logout = (req, res)=>{
    res.clearCookie("token")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}