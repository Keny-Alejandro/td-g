/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstadoSeguimiento } from 'src/estado_seguimiento/entities/estado_seguimiento.entity';
import { SeguimientoPpi } from 'src/seguimiento_ppi/entities/seguimiento_ppi.entity';

@Entity({ name: 'Estado_Seguimiento_Cambio' })
export class EstadoSeguimientoCambio {
    @PrimaryGeneratedColumn({ name: 'Estado_Seguimiento_Cambio_ID' })
    id: number;

    @Column({ name: 'Fecha_Cambio', type: 'timestamp with time zone' })
    fecha: Date;

    @ManyToOne(() => EstadoSeguimiento)
    @JoinColumn({ name: 'Estado_Seguimiento_ID' })
    estadoSeguimiento: EstadoSeguimiento;

    @ManyToOne(() => SeguimientoPpi)
    @JoinColumn({ name: 'Seguimiento_PPI_ID' })
    seguimiento: SeguimientoPpi;
}
