import express from 'express';
import {test, updateUser, deleteUser} from '../controllers/user.controller.js'
import {verifyToken} from "../utils/verifyUser.js";

const route = express.Router();

route.get('/test', test);
route.post('/update/:id', verifyToken, updateUser);
route.delete('/delete/:id', verifyToken, deleteUser);

export default route;