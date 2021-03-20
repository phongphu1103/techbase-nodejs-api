import express from "express"


import ValidatorHandling from "../middlewares/ValidatorHandling"

import UsersController from "../controllers/users/UsersController"
import UsersValidator from "../controllers/users/UsersValidator"

const router = express.Router()

router.get('/index/:pk?', UsersController.get_index);
router.post('/index', ValidatorHandling(UsersValidator.postCreateRecord), UsersController.post_index);
router.put('/index/:pk', ValidatorHandling(UsersValidator.putUpdateRecord), UsersController.put_index);
router.delete("/:id", UsersController.delete)
router.get("/:id", UsersController.detail)

export default router;