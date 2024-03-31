/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';

@Entity({ name: 'Estado_Cita' })
export class EstadoCita {
  @PrimaryGeneratedColumn({ name: 'Estado_Cita_ID' })
  id: number;

  @Column({ name: 'Descripcion_Estado_Cita', type: 'varchar', length: 100 })
  nombre: string;

  @OneToMany(() => CitasAsesoriaPpi, (citas) => citas.estadoCita)
  estadoCita: CitasAsesoriaPpi[];
}
