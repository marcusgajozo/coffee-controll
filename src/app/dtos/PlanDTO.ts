import { IsString, IsNotEmpty, Min, IsInt, Max } from "class-validator";

export class PlanDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(0)
  @Max(10)
  price: number;

  @IsInt()
  @Min(1)
  @Max(10)
  durationMonths: number;
}
