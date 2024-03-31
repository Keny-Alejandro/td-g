/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Programa } from 'src/programa/entities/programa.entity';

@Entity({ name: 'Asignatura' })
export class Asignatura {
  @PrimaryGeneratedColumn({ name: 'Asignatura_ID' })
  id: number;

  @Column({ name: 'Asignatura_Nombre', type: 'varchar', length: 100 })
  nombre: string;

  @ManyToOne(() => Programa, (programa) => programa.asignaturas)
  @JoinColumn({ name: 'Programa_ID' })
  programa: Programa;

  @Column({ name: 'Programa_ID' })
  programaId: number;
}
