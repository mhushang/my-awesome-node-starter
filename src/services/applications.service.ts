import bcrypt from 'bcrypt';
import DB from '../databases';
import { CreateApplicationDto } from '@dtos/applications.dto';
import HttpException from '@exceptions/HttpException';
import { Application } from '@interfaces/applications.interface';
import { isEmpty } from '@utils/util';

class ApplicationService {
  public applications = DB.Applications;

  public async findAllApplications(): Promise<Application[]> {
    const allApplications: Application[] = await this.applications.findAll();
    return allApplications;
  }

  public async findApplicationById(applicationId: number): Promise<Application> {
    if (isEmpty(applicationId)) throw new HttpException(400, "You're not applicationId");

    const findApplication: Application = await this.applications.findByPk(applicationId);
    if (!findApplication) throw new HttpException(409, "You're not application");

    return findApplication;
  }

  public async createApplication(applicationData: CreateApplicationDto): Promise<Application> {
    if (isEmpty(applicationData)) throw new HttpException(400, "You're not applicationData");

    const findApplication: Application = await this.applications.findOne({ where: { phoneNumber: applicationData.phoneNumber } });
    if (findApplication) throw new HttpException(409, `You're phoneNumber ${applicationData.phoneNumber} already exists`);
    const phoneStaged = applicationData?.phoneNumber?.replace(/\D/g, '');
    const createApplicationData: Application = await this.applications.create({ ...applicationData, phoneNumber: phoneStaged });
    return createApplicationData;
  }

  public async updateApplication(applicationId: number, applicationData: CreateApplicationDto): Promise<Application> {
    if (isEmpty(applicationData)) throw new HttpException(400, "You're not applicationData");

    const findApplication: Application = await this.applications.findByPk(applicationId);
    if (!findApplication) throw new HttpException(409, "You're not application");

    const phoneStaged = applicationData?.phoneNumber?.replace(/\D/g, '');
    await this.applications.update({ ...applicationData, phoneNumber: phoneStaged }, { where: { id: applicationId } });

    const updateApplication: Application = await this.applications.findByPk(applicationId);
    return updateApplication;
  }

  public async deleteApplication(applicationId: number): Promise<Application> {
    if (isEmpty(applicationId)) throw new HttpException(400, "You're not applicationId");

    const findApplication: Application = await this.applications.findByPk(applicationId);
    if (!findApplication) throw new HttpException(409, "You're not findApplication");

    await this.applications.destroy({ where: { id: applicationId } });

    return findApplication;
  }
}

export default ApplicationService;
