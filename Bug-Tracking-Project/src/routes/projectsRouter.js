import express from 'express';
import {createProject, getProjects,deleteProject,getProjectByName, getProjectById} from "../dataAcces/ProjectsDA.js"

let projectsRouter = express.Router();
  
projectsRouter.route('/projects').post( async (req, res) => {
  return res.json(await createProject(req.body));
})

projectsRouter.route('/projects').get( async (req, res) => {
  return res.json(await getProjects());
})

projectsRouter.route('/projects/:id').delete( async (req, res) => {
  return res.json(await deleteProject(req.params.id));
})

projectsRouter.route('/projects/:name').get( async (req, res) => {
  return res.json(await getProjectByName(req.params.name));
})

projectsRouter.route('/projects/byId/:id').get( async (req, res) => {
  return res.json(await getProjectById(req.params.id));
})

export default projectsRouter;