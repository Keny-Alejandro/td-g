/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'Usuario_Calificacion' })
export class UsuarioCalificacion {
  @PrimaryGeneratedColumn({ name: 'Usuario_Calificacion_ID' })
  id: number;

  @Column({ name: 'Usuario', type: 'int' })
  user: number;

  @Column({ name: 'Entrega', type: 'int' })
  entrega: number;

  @Column({ name: 'Calificacion', type: 'decimal', precision: 6, scale: 1, nullable: true })
  calificacion: number | null;

}
