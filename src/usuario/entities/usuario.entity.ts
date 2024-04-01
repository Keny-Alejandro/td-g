/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Rol } from 'src/rol/entities/rol.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { HoraSemanal } from 'src/hora_semanal/entities/hora_semanal.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { EquipoPpiPjic } from 'src/equipo_ppi_pjic/entities/equipo_ppi_pjic.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';

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

  @OneToMany(() => HoraSemanal, (hora) => hora.hora)
  hora: HoraSemanal[];

  @OneToMany(() => EquipoUsuario, (usuario) => usuario.usuario)
  usuario: EquipoUsuario[];

  @OneToMany(() => EquipoPpiPjic, (usuariopjic) => usuariopjic.usuariopjic)
  usuariopjic: EquipoPpiPjic[];

  @OneToMany(() => CitasAsesoriaPpi, (usuariocitaequipo) => usuariocitaequipo.usuariocitaequipo)
  usuariocitaequipo: CitasAsesoriaPpi[];
  
}
