/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';

@Entity({ name: 'Seguimiento_PPI' })
export class SeguimientoPpi {
  @PrimaryGeneratedColumn({ name: 'Seguimiento_PPI_ID' })
  id: number;

  @Column({ name: 'Fecha_Creacion_Asesoria', type: 'timestamp with time zone' })
  fecha: Date;

  @Column({ name: 'Compromiso_Asesoria', type: 'varchar', length: 255 })
  compromiso: string;

  @Column({ name: 'Observacion_Asesoria', type: 'varchar', length: 255 })
  observacion: string;

  @Column({ name: 'Semana_Asesoria', type: 'int' })
  semana: number;

  @Column({ name: 'Asistencia_Asesoria', type: 'json' })
  asistencia: JSON;

  @OneToMany(
    () => EstadoSeguimientoCambio,
    (seguimiento) => seguimiento.estadoSeguimiento,
  )
  seguimiento: EstadoSeguimientoCambio[];

  @ManyToOne(() => CitasAsesoriaPpi)
  @JoinColumn({ name: 'Citas_Asesoria_PPI_ID' })
  citas: CitasAsesoriaPpi;
}
