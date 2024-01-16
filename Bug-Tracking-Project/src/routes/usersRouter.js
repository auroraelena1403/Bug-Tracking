import express from 'express';
import {createUser, getUsers, deleteUser, getUserByName} from "../dataAcces/UsersDA.js"

let usersRouter = express.Router();
  
usersRouter.route('/users').post( async (req, res) => {
  return res.json(await createUser(req.body));
})

usersRouter.route('/users').get( async (req, res) => {
  return res.json(await getUsers());
})

usersRouter.route('/users/:userName').get( async (req, res) => {
  return res.json(await getUserByName(req.params.userName));
})

usersRouter.route('/users/:id').delete( async (req, res) => {
  return res.json(await deleteUser(req.params.id));
}) 

export default usersRouter;