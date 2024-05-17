import { IsNotEmpty, IsString, IsInt, IsDateString, IsOptional } from 'class-validator';

export class CreateBannerDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsInt()
    estado: number;

    @IsNotEmpty()
    @IsDateString()
    fechaInicio: Date;

    @IsNotEmpty()
    @IsDateString()
    fechaFin: Date;

    @IsNotEmpty()
    @IsInt()
    tipoBanner: number;

    @IsNotEmpty()
    @IsString()
    contenidoBanner: string;

    @IsOptional()
    file: Express.Multer.File;

    @IsOptional()
    @IsString()
    urlImagen: string;
}
