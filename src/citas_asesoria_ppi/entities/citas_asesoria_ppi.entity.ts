/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { ObservacionCita } from 'src/observacion_cita/entities/observacion_cita.entity';
import { EstadoCita } from 'src/estado_cita/entities/estado_cita.entity';
import { TipoCita } from 'src/tipo_cita/entities/tipo_cita.entity';
import { SeguimientoPpi } from 'src/seguimiento_ppi/entities/seguimiento_ppi.entity';

@Entity({ name: 'Citas_Asesoria_PPI' })
export class CitasAsesoriaPpi {
  @PrimaryGeneratedColumn({ name: 'Citas_Asesoria_PPI_ID' })
  id: number;

  @Column({ name: 'Fecha_Cita', type: 'timestamp with time zone' })
  fecha: Date;

  @Column({ name: 'Link_Cita', type: 'varchar', length: 255 })
  link: string;

  @Column({ name: 'Modificaciones_Cita', type: 'varchar', length: 255 })
  modificaciones: string;

  @ManyToOne(() => EstadoCita)
  @JoinColumn({ name: 'Estado_Cita_ID' })
  estadoCita: EstadoCita;

  @ManyToOne(() => TipoCita)
  @JoinColumn({ name: 'Tipo_Cita_ID' })
  tipoCita: TipoCita;

  @ManyToOne(() => ObservacionCita)
  @JoinColumn({ name: 'Observacion_Cita_ID' })
  observacionCita: ObservacionCita;

  @OneToMany(
    () => SeguimientoPpi,
    (citas) => citas.citas,
  )
  citas: SeguimientoPpi[];
}
