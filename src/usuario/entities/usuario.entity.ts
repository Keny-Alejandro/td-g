/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rol } from 'src/rol/entities/rol.entity';
import { Programa } from 'src/programa/entities/programa.entity';

@Entity({ name: 'Usuario' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'Usuario_ID' })
  id: number;

  @Column({ name: 'Usuario_Nombre', type: 'varchar', length: 255 })
  nombre: string;

  @Column({ name: 'Usuario_Documento', type: 'varchar', length: 50 })
  documento: string;

  @Column({ name: 'Usuario_Correo', type: 'varchar', length: 255 })
  correo: string;

  @Column({ name: 'Usuario_Clave', type: 'varchar', length: 255 })
  clave: string;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'Rol_ID' })
  rol: Rol;

  @ManyToOne(() => Programa)
  @JoinColumn({ name: 'Programa_ID' })
  programa: Programa;
}
