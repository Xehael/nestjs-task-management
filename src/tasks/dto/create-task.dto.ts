import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateTaskDto {
    
  @IsNotEmpty()
    title: string;
  @IsNotEmpty()
    description: string;
  @Optional()
  @IsNumber()
  @Type(() => Number)
    priority: number;
    
  }