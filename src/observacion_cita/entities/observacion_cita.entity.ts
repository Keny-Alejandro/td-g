/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';

@Entity({ name: 'Observacion_Cita' })
export class ObservacionCita {
  @PrimaryGeneratedColumn({ name: 'Observacion_Cita_ID' })
  id: number;

  @Column({ name: 'Descripcion_Observacion_Cita', type: 'varchar', length: 255 })
  nombre: string;

  @OneToMany(() => CitasAsesoriaPpi, (citas) => citas.observacionCita)
  observacionCita: CitasAsesoriaPpi[];
}
