const express = require("express");
const multer = require("multer")
const router = express.Router();

const upload = multer()

const controller = require("../../controllers/admin/account.controller")
const validate = require("../../validates/admin/account.validate")
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single('avatar'), validate.createPost, uploadCloud.upload, controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", upload.single('avatar'), validate.editPatch, uploadCloud.upload, controller.editPatch);


// ..more router

module.exports = router;