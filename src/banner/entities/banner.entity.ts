/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Banner' })
export class Banner {
  @PrimaryGeneratedColumn({ name: 'Banner_ID' })
  id: number;

  @Column({ name: 'Banner_Name', type: 'varchar',nullable:true })
  nombre: string;

  @Column({ name: 'Banner_Estado', type: 'smallint', default: 0 })
  estado: number; // 0: Inactivo, 1: Activo

  @Column({ name: 'Banner_FechaInicio', type: 'date' })
  fechaInicio: Date;

  @Column({ name: 'Banner_FechaFin', type: 'date' })
  fechaFin: Date;

  @Column({ name: 'Tipo_Banner', type: 'int' })
  tipoBanner: number; // 1: principal, 2: secundario

  @Column({ name: 'Contenido_Banner', type: 'varchar' })
  contenidoBanner: string;

  @Column({ name: 'Url_Imagen', type: 'varchar' })
  urlImagen: string;
}
