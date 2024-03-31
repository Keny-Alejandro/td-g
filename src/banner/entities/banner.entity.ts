/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Banner' })
export class Banner {
  @PrimaryGeneratedColumn({ name: 'Banner_ID' })
  id: number;

  @Column({ name: 'Banner_Name', type: 'varchar', length: 50 })
  nombre: string;

  @Column({ name: 'Banner_Estado', type: 'smallint', default: 0 })
  estado: number; // 0: Inactivo, 1: Activo

  @Column({ name: 'Banner_FechaInicio', type: 'date' })
  fechainicio: Date;

  @Column({ name: 'Banner_FechaFin', type: 'date' })
  fechafin: Date;
}
