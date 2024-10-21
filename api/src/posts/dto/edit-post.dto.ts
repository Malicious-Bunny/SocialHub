import { IsNotEmpty, IsString } from 'class-validator';

export class EditPostDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
