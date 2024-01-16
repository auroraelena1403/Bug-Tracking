import express from 'express';
import {createBug, getBugs,deleteBug, getBugsForProject} from "../dataAcces/BugDA.js"

let bugsRouter = express.Router();
  
bugsRouter.route('/bugs').post( async (req, res) => {
  return res.json(await createBug(req.body));
})

bugsRouter.route('/bugs').get( async (req, res) => {
  return res.json(await getBugs());
})

bugsRouter.route('/bugs/:id').delete( async (req, res) => {
  return res.json(await deleteBug(req.params.id));
})

bugsRouter.route('/bugs/:projectId').get( async (req, res) => {
  return res.json(await getBugsForProject(req.params.projectId));
})

export default bugsRouter;