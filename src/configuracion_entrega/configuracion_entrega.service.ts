/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { ConfiguracionEntrega } from './entities/configuracion_entrega.entity';

@Injectable()
export class ConfiguracionEntregaService {
    constructor(
        @InjectRepository(ConfiguracionEntrega)
        private readonly configuracionEntregaRepository: Repository<ConfiguracionEntrega>,
    ) { }

    async createConfiguracionEntrega(entregas: any[]): Promise<void> {
        for (const entrega of entregas) {
            // Buscar si existe una configuración con el mismo ID
            const configuracionExistente =
                await this.configuracionEntregaRepository.findOne({
                    where: { configuracion: { id: entrega.id } },
                } as FindOneOptions<ConfiguracionEntrega>);

            if (configuracionExistente) {
                // Si existe, actualizar los valores de ese registro
                configuracionExistente.fechaEntrega = entrega.fechaEntrega
                    ? new Date(entrega.fechaEntrega)
                    : null;
                configuracionExistente.fechaCalificacion = new Date(
                    entrega.fechaCalificacion,
                );
                configuracionExistente.porcentaje = entrega.porcentaje;
                configuracionExistente.rolId = parseInt(entrega.rol);

                await this.configuracionEntregaRepository.save(configuracionExistente);
            } else {
                // Si no existe, crear un nuevo registro
                const nuevaConfiguracion = new ConfiguracionEntrega();
                nuevaConfiguracion.fechaEntrega = entrega.fechaEntrega
                    ? new Date(entrega.fechaEntrega)
                    : null;
                nuevaConfiguracion.fechaCalificacion = new Date(
                    entrega.fechaCalificacion,
                );
                nuevaConfiguracion.porcentaje = entrega.porcentaje;
                nuevaConfiguracion.rolId = parseInt(entrega.rol);
                nuevaConfiguracion.configuracion = entrega.id;

                await this.configuracionEntregaRepository.save(nuevaConfiguracion);
            }
        }
    }

    async getEntregasSOL() {
        return this.configuracionEntregaRepository
            .createQueryBuilder('ce')
            .select([
                'ce.Configuracion_Entrega_ID',
                'ce.Tipo_Entrega_ID',
                'ce.Plazo_Calificacion',
                'ce.Plazo_Entrega',
                'ce.Porcentaje_Entrega',
                'te.Tipo_Entrega_Descripcion',
            ])
            .innerJoin('Tipo_Entrega', 'te', 'te.Tipo_Entrega_ID = ce.Tipo_Entrega_ID')
            .innerJoin('Usuario', 'u', 'u.Rol_ID = ce.Rol_ID')
            .where('ce.Rol_ID = 2 OR u.Rol_ID = 5')
            .orderBy('ce.Tipo_Entrega_ID')
            .getRawMany();
    }
    
    async getEntregasCoordinador() {
        return this.configuracionEntregaRepository
            .createQueryBuilder('ce')
            .select([
                'ce.Configuracion_Entrega_ID',
                'ce.Tipo_Entrega_ID',
                'ce.Plazo_Calificacion',
                'ce.Plazo_Entrega',
                'ce.Porcentaje_Entrega',
                'te.Tipo_Entrega_Descripcion',
            ])
            .innerJoin('Tipo_Entrega', 'te', 'te.Tipo_Entrega_ID = ce.Tipo_Entrega_ID')
            .where('ce.Rol_ID = 4')
            .orderBy('ce.Tipo_Entrega_ID')
            .getRawMany();
    }

    async getEntregasAsesor() {
        return this.configuracionEntregaRepository
            .createQueryBuilder('ce')
            .select([
                'ce.Configuracion_Entrega_ID',
                'ce.Tipo_Entrega_ID',
                'ce.Plazo_Calificacion',
                'ce.Plazo_Entrega',
                'ce.Porcentaje_Entrega',
                'te.Tipo_Entrega_Descripcion',
            ])
            .innerJoin('Tipo_Entrega', 'te', 'te.Tipo_Entrega_ID = ce.Tipo_Entrega_ID')
            .where('ce.Rol_ID = 3 OR ce.Rol_ID = 5')
            .orderBy('ce.Tipo_Entrega_ID')
            .getRawMany();
    }
}
