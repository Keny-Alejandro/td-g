/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity({ name: 'Equipo_Usuario' })
export class EquipoUsuario {
  @PrimaryGeneratedColumn({ name: 'Equipo_Usuario_ID' })
  id: number;

  @Column({ name: 'Codigo_Equipo', type: 'int' })
  codigoEquipo: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuario)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario: Usuario;

  @Column({ name: 'Usuario_ID' })
  usuarioId: number;

}