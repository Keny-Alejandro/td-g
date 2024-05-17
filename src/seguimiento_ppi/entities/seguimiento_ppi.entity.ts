/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { EstadoSeguimientoCambio } from 'src/estado_seguimiento_cambio/entities/estado_seguimiento_cambio.entity';
import { CitasAsesoriaPpi } from 'src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity';

@Entity({ name: 'Seguimiento_PPI' })
export class SeguimientoPpi {
  @PrimaryGeneratedColumn({ name: 'Seguimiento_PPI_ID' })
  id: number;
 
  @Column({ name: 'Compromiso_Asesoria', type: 'varchar', length: 255, nullable: true })
  compromiso: string | null;

  @Column({ name: 'Observacion_Asesoria', type: 'varchar', length: 255,nullable: true })
  observacion: string | null;
  
  @Column({ name: 'Semana_Asesoria', type: 'int', nullable: true })
  semana: string | null;

  @Column({ name: 'Estudiante_1', type: 'varchar',length: 100,nullable: true })
  estudiante1: string | null;

  
  @Column({ name: 'Estudiante_2', type: 'varchar',nullable: true })
  estudiante2: string | null;

  @Column({ name: 'Estudiante_3', type: 'varchar',nullable: true })
  estudiante3: string | null;
  
  @Column({ name: 'Asistencia_Estudiante_1', type: 'int',nullable: true })
  asistenciaEstudiante1: number | null; 

  
  @Column({ name: 'Asistencia_Estudiante_2', type: 'int',nullable: true })
  asistenciaEstudiante2: number | null; 

  
  @Column({ name: 'Asistencia_Estudiante_3', type: 'int',nullable: true })
  asistenciaEstudiante3: number | null; 


  @OneToMany(
    () => EstadoSeguimientoCambio,
    (seguimiento) => seguimiento.estadoSeguimiento,
  )
  seguimiento: EstadoSeguimientoCambio[];

  @ManyToOne(() => CitasAsesoriaPpi)
  @JoinColumn({ name: 'Citas_Asesoria_PPI_ID' })
  citas: CitasAsesoriaPpi;
}
