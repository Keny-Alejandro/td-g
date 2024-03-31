/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';

@Entity({ name: 'Estado_Seguimiento' })
export class EstadoSeguimiento {
  @PrimaryGeneratedColumn({ name: 'Estado_Seguimiento_ID' })
  id: number;

  @Column({
    name: 'Descripcion_Estado_Seguimiento',
    type: 'varchar',
    length: 255,
  })
  nombre: string;

  @OneToMany(
    () => EstadoSeguimientoCambio,
    (estado) => estado.estadoSeguimiento,
  )
  estadoSeguimiento: EstadoSeguimientoCambio[];
}
