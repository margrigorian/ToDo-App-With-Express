import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validate } from "../middlewares/validate.js";
import { getExpeditionsController } from "../controllers/expeditionsControllers.js";
import { 
    getUserExpeditionsController, 
    postUserExpeditionsController,
    putUserExpeditionsController,
    deleteUserExpeditionsController } from "../controllers/userExpeditionsControllers.js";

const router = express.Router();

// все посты
router.get("/", authenticate(), getExpeditionsController);
router.put("/", validate("put"), authenticate(true), putUserExpeditionsController); // из юзеровского контроллера
router.delete("/", authenticate(true), deleteUserExpeditionsController); // для админа по изменению постов других пользователей

// посты конкретного пользователя
router.get('/user/:userId', authenticate(), getUserExpeditionsController);
router.post('/user/:userId', validate("post"), authenticate(), postUserExpeditionsController);
router.put('/user/:userId', validate("put"), authenticate(), putUserExpeditionsController);
router.delete('/user/:userId', authenticate(), deleteUserExpeditionsController);

export default router;