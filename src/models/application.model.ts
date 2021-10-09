import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Application } from '@interfaces/applications.interface';

export type ApplicationCreationAttributes = Optional<
  Application,
  'id' | 'fullName' | 'info' | 'phoneNumber' | 'status' | 'visitDate' | 'workPlace' | 'email'
>;

export class ApplicationModel extends Model<Application, ApplicationCreationAttributes> implements Application {
  public id: number;
  public fullName: string;
  public info: string;
  public phoneNumber: string;
  public status: string;
  public visitDate: string;
  public workPlace: string;
  public email: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ApplicationModel {
  ApplicationModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      fullName: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      info: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      visitDate: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      workPlace: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'applications',
      sequelize,
    },
  );

  return ApplicationModel;
}
