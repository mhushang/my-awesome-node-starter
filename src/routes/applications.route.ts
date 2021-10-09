import { Router } from 'express';
import ApplicationController from '@controllers/application.controller';
import { CreateApplicationDto } from '@dtos/applications.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class ApplicationsRoute implements Route {
  public path = '/applications';
  public router = Router();
  public applicationController = new ApplicationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.applicationController.getApplications);
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.applicationController.getApplicationById);
    this.router.post(`${this.path}`, validationMiddleware(CreateApplicationDto, 'body'), this.applicationController.createApplication);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      [authMiddleware, validationMiddleware(CreateApplicationDto, 'body', true)],
      this.applicationController.updateApplication,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.applicationController.deleteApplication);
  }
}

export default ApplicationsRoute;
