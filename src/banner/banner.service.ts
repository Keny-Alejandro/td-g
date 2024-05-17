import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { format } from 'date-fns';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,

  ) { }

  async findAllVisiblesByType(tipoBanner: number) {
    const CurrentDateaux = new Date(); 
    CurrentDateaux.setUTCHours(CurrentDateaux.getUTCHours() - 5); 
    const currentDate = format(CurrentDateaux, 'yyyy-MM-dd'); 
    //const currentDate = DateTime.now().setZone('America/Bogota').toFormat('yyyy-MM-dd'); // Date format'YYYY-MM-DD'
    const banners = await this.bannerRepository
      .createQueryBuilder('banner')
      .where('banner.tipoBanner = :tipoBanner', { tipoBanner })
      .andWhere(':currentDate BETWEEN banner.Banner_FechaInicio AND banner.Banner_FechaFin', { currentDate })
      .andWhere('banner.Banner_Estado = :estado', { estado: 1 })
      .orderBy('banner.Banner_FechaFin', 'ASC')
      .getMany();
    return banners;
  }

  async findAll() {
    const banners = await this.bannerRepository.createQueryBuilder('banner')
      .groupBy('banner.Banner_Estado')
      .addGroupBy('banner.Tipo_Banner')
      .addGroupBy('banner.Banner_ID')
      .orderBy('banner.Banner_Estado', 'DESC')
      .addOrderBy('banner.Tipo_Banner', 'ASC')
      .addOrderBy('banner.Banner_FechaFin', 'ASC')
      .getMany();
    return banners;
  }

  async create(createBannerDto: CreateBannerDto, urlImagen: string) {
    try {
      const banner = this.bannerRepository.create({
        ...createBannerDto,
        urlImagen: urlImagen,
      });

      return await this.bannerRepository.save(banner);
    } catch (error) {
      if (error.code === '23505') { // duplicated pk code error on PostgreSQL
        await new Promise(resolve => setTimeout(resolve, 500)); // 1/2 seg to try a new req
        return this.create(createBannerDto, urlImagen);
      } else {
        throw error;
      }
    }
  }

  async update(id: number, updateBannerDto: UpdateBannerDto, urlImagen: string) {
    if (!await this.bannerRepository.findOne({ where: { id } })) {
      throw new NotFoundException('Banner no encontrado');
    }
    const updatedBannerDto = urlImagen ? { ...updateBannerDto, urlImagen } : updateBannerDto;
    return this.bannerRepository.update(id, updatedBannerDto);
  }

  async findById(id: number) {
    const banner = await this.bannerRepository.findOne({ where: { id } });
    if (!banner) {
      throw new NotFoundException('Banner no encontrado');
    }
    return banner;
  }

  async visible(id: number, estado: number) {
    const banner = await this.bannerRepository.findOne({ where: { id } });
    if (!banner) {
      throw new NotFoundException('Banner no encontrado');
    }
    banner.estado = estado;
    return this.bannerRepository.save(banner);
  }

  async delete(id: number) {
    const banner = await this.bannerRepository.findOne({ where: { id } });
    if (!banner) {
      throw new NotFoundException('Banner no encontrado');
    }
    return this.bannerRepository.remove(banner);
  }

}
