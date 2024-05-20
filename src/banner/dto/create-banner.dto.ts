import { IsNotEmpty, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateBannerDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    estado: number;

    @IsNotEmpty()
    @IsDateString()
    fechaInicio: Date;

    @IsNotEmpty()
    @IsDateString()
    fechaFin: Date;

    @IsNotEmpty()
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
