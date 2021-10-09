import { NextFunction, Request, Response } from 'express';
import { CreateApplicationDto } from '@dtos/applications.dto';
import { Application } from '@interfaces/applications.interface';
import ApplicationService from '@services/applications.service';

class ApplicationsController {
  public applicationsService = new ApplicationService();

  public getApplications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllApplicationsData: Application[] = await this.applicationsService.findAllApplications();

      res.status(200).json({ data: findAllApplicationsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getApplicationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applicationId = Number(req.params.id);
      const findOneApplicationData: Application = await this.applicationsService.findApplicationById(applicationId);

      res.status(200).json({ data: findOneApplicationData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applicationData: CreateApplicationDto = req.body;
      const createApplicationData: Application = await this.applicationsService.createApplication(applicationData);

      res.status(201).json({ data: createApplicationData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applicationId = Number(req.params.id);
      const applicationData: CreateApplicationDto = req.body;
      const updateApplicationData: Application = await this.applicationsService.updateApplication(applicationId, applicationData);

      res.status(200).json({ data: updateApplicationData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const applicationId = Number(req.params.id);
      const deleteApplicationData: Application = await this.applicationsService.deleteApplication(applicationId);

      res.status(200).json({ data: deleteApplicationData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ApplicationsController;
