// [GET] /admin/dasboard

module.exports.dashboard = (req, res)=>{
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Homepage"
    });
}