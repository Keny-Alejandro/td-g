/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { EntregaEquipoPpi } from 'src/entrega_equipo_ppi/entities/entrega_equipo_ppi.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';

@Entity({ name: 'Equipo_PPI' })
export class EquipoPpi {
  @PrimaryGeneratedColumn({ name: 'Equipo_PPI_ID' })
  id: number;

  @Column({ name: 'Codigo_Equipo', type: 'int', unique: true })
  codigoEquipo: number;

  @Column({ name: 'Nombre_Proyecto', type: 'varchar', length: 300 })
  nombre: string;

  @Column({ name: 'Descripcion_Proyecto', type: 'varchar', length: 500 })
  descripcion: string;

  @Column({ name: 'Alcance_Proyecto', type: 'varchar', length: 500 })
  alcance: string;

  @Column({ name: 'Alcance_Socializacion_Uno', type: 'varchar', length: 500 })
  socializacionuno: string;

  @Column({ name: 'Alcance_Socializacion_Dos', type: 'varchar', length: 500 })
  socializaciondos: string;

  @Column({ type: 'json', nullable: true, name: 'Canceladas' })
  canceladas: JSON;

  @ManyToOne(() => EquipoUsuario, (equipousuario) => equipousuario.equipousuario)
  @JoinColumn({ name: 'Codigo_Equipo', referencedColumnName: 'codigoEquipo' })
  equipousuario: EquipoUsuario;  

  @OneToMany(() => EntregaEquipoPpi, (configuracionentrega) => configuracionentrega.configuracionentrega)
  configuracionentrega: EntregaEquipoPpi[];

  @OneToMany(() => CitasAsesoriaPpi, (equipocita) => equipocita.equipocita)
  equipocita: CitasAsesoriaPpi[];
}