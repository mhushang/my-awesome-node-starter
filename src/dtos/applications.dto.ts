import { IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  public phoneNumber: string;

  @IsString()
  public fullName: string;

  @IsString()
  public visitDate: string;

  @IsString()
  public workPlace: string;
}
