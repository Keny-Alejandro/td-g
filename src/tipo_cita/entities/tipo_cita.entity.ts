/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';

@Entity({ name: 'Tipo_Cita' })
export class TipoCita {
  @PrimaryGeneratedColumn({ name: 'Tipo_Cita_ID' })
  id: number;

  @Column({ name: 'Descripcion_Tipo_Cita', type: 'varchar', length: 10 })
  nombre: string;

  @OneToMany(() => CitasAsesoriaPpi, (citas) => citas.tipoCita)
  tipoCita: CitasAsesoriaPpi[];
}
