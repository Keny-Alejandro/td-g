/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity({ name: 'Programa' })
export class Programa {
  @PrimaryGeneratedColumn({ name: 'Programa_ID' })
  id: number;

  @Column({ name: 'Programa_Nombre' })
  nombre: string;

  @OneToMany(() => Asignatura, (asignatura) => asignatura.programa)
  asignaturas: Asignatura[];

  @OneToMany(() => Usuario, (Usuario) => Usuario.programa)
  usuario: Usuario[];
}
