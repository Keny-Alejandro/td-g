/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Asignatura } from 'src/asignatura/entities/asignatura.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { EquipoPpiPjic } from 'src/equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';

@Entity({ name: 'Equipo_Usuario' })
export class EquipoUsuario {
  @PrimaryGeneratedColumn({ name: 'Equipo_Usuario_ID' })
  id: number;

  @Column({ name: 'Codigo_Equipo', type: 'int' })
  codigo: number;

  @ManyToOne(() => Asignatura, (equipo) => equipo.equipo)
  @JoinColumn({ name: 'Asignatura_ID' })
  equipo: Asignatura;

  @Column({ name: 'Asignatura_ID' })
  asignaturaId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuario)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario: Usuario;

  @Column({ name: 'Usuario_ID' })
  usuarioId: number;

  @OneToMany(() => EquipoPpi, (equipousuario) => equipousuario.equipousuario)
  equipousuario: EquipoPpi[];

  @OneToMany(() => EquipoPpiPjic, (equipousuariopjic) => equipousuariopjic.equipousuariopjic)
  equipousuariopjic: EquipoPpiPjic[];
}
