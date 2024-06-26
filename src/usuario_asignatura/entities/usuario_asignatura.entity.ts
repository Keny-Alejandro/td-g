/* eslint-disable prettier/prettier */
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ManyToOne, PrimaryGeneratedColumn, Entity, JoinColumn, Column } from 'typeorm';

@Entity({ name: 'Usuario_Asignatura' })
export class UsuarioAsignatura {
  @PrimaryGeneratedColumn({ name: 'Usuario_Asignatura_ID' })
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'Usuario_ID' })
  usuarioasignatura: Usuario;

  @Column({ name: 'Asignatura_Codigo', type: 'int' })
  semestre: number;

  @Column({ name: 'Grupo_Codigo', type: 'int' })
  grupo: number;

  @Column({ name: 'Consecutivo', type: 'int', nullable: true })
  consecutivo: number | null;
}
