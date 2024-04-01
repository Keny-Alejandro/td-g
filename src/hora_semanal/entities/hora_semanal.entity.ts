/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity({ name: 'Hora_Semanal' })
export class HoraSemanal {
  @PrimaryGeneratedColumn({ name: 'Hora_Semanal_ID' })
  id: number;

  @Column({ name: 'Asignatura_Nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'Horas_Asignadas', type: 'smallint' })
  horasAsignadas: number;

  @Column({ name: 'Horas_Pendientes', type: 'smallint' })
  horasPendientes: number;

  @Column({ name: 'Salon_Asignado', type: 'varchar', length: 150 })
  salon: string;

  @ManyToOne(() => Usuario, (hora) => hora.hora)
  @JoinColumn({ name: 'Usuario_ID' })
  hora: Usuario;

}
