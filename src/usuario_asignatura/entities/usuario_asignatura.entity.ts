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

  @Column({ name: 'Asignatura_Semestre', type: 'int'})
  semestre: number;
}
