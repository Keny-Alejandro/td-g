import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Banner' })
export class Banner {
  @PrimaryGeneratedColumn()
  Banner_ID: number;

  @Column({ type: 'varchar', length: 50 })
  Banner_Name: string;

  @Column({ type: 'smallint', default: 0 })
  Banner_Estado: number; // 0: Inactivo, 1: Activo

  @Column({ type: 'date' })
  Banner_FechaInicio: Date;

  @Column({ type: 'date' })
  Banner_FechaFin: Date;
}
