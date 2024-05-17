import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, fileNameCall } from './../helpers/images.helper';
import { Banner } from './entities/banner.entity';

const relativeImgPath = '/public/Media/contenido';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {
  }

  @Post('upload-img')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: relativeImgPath,
      filename: fileNameCall
    }),
    fileFilter: fileFilter,
  }))
  async uploadImgFile(@UploadedFile() file: Express.Multer.File) {// npm install multer @types/multer
    const filePath = `${relativeImgPath}/${file.originalname}`;
    return filePath;
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: relativeImgPath,
      filename: fileNameCall
    }),
    fileFilter: fileFilter,
  }))
  async create(@Body() createBannerDto: CreateBannerDto, @UploadedFile() file: Express.Multer.File) {
    const filePath = await this.uploadImgFile(file);
    const banner = await this.bannerService.create(
      createBannerDto, filePath,
    );
    return banner;
  }

  @Get('tipo/:tipoBanner')
  async getAllVisiblesByType(@Param('tipoBanner') tipoBanner: string): Promise<Banner[]> {
    const banners = await this.bannerService.findAllVisiblesByType(parseInt(tipoBanner, 10));
    return banners;
  }

  @Get('')
  async findAll(@Param('estadoBanner') estado: string): Promise<Banner[]> {
    const banners = await this.bannerService.findAll();
    return banners;
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: relativeImgPath,
      filename: fileNameCall
    }),
    fileFilter: fileFilter,
  }))
  async update(@Param('id') id: number, @Body() UpdateBannerDto: UpdateBannerDto, @UploadedFile() file: Express.Multer.File) {
    const urlImagen = file ? await this.uploadImgFile(file) : null;
    return await this.bannerService.update(+id, UpdateBannerDto, urlImagen);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.bannerService.findById(+id);
  }

  @Patch('visible/:id')
  async visible(@Param('id') id: number, @Body('estado') estado: number) {
    return await this.bannerService.visible(+id, estado);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.bannerService.delete(+id);
  }
}
