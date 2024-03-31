/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity({ name: 'Rol' })
export class Rol {
  @PrimaryGeneratedColumn({ name: 'Rol_ID' })
  id: number;

  @Column({ name: 'Rol_Descripcion' })
  nombre: string;

  @OneToMany(() => Usuario, (Usuario) => Usuario.rol)
  rol: Usuario[];
}
