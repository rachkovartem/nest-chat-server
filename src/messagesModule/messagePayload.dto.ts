import { IsString } from 'class-validator';

export class messagePayloadDto {
  @IsString()
  id: string;

  @IsString()
  message: string;

  @IsString()
  username: string;
}