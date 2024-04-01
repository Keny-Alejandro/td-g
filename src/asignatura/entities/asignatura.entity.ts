/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Programa } from 'src/programa/entities/programa.entity';
import { ConfiguracionEntrega } from 'src/configuracion_entrega/entities/configuracion_entrega.entity';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';

@Entity({ name: 'Asignatura' })
export class Asignatura {
  @PrimaryGeneratedColumn({ name: 'Asignatura_ID' })
  id: number;

  @Column({ name: 'Asignatura_Nombre', type: 'varchar', length: 100 })
  nombre: string;

  @ManyToOne(() => Programa, (programa) => programa.asignaturas)
  @JoinColumn({ name: 'Programa_ID' })
  programa: Programa;

  @OneToMany(() => ConfiguracionEntrega, (configuracion) => configuracion.asignaturas)
  asignaturas: ConfiguracionEntrega[];

  @OneToMany(() => EquipoUsuario, (equipo) => equipo.equipo)
  equipo: EquipoUsuario[];

  @Column({ name: 'Programa_ID' })
  programaId: number;
}
