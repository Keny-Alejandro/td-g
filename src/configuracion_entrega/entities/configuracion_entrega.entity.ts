/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
  } from 'typeorm';
import { TipoEntrega } from 'src/tipo_entrega/entities/tipo_entrega.entity';
import { EntregaEquipoPpi } from 'src/entrega_equipo_ppi/entities/entrega_equipo_ppi.entity';
  
  @Entity({ name: 'Configuracion_Entrega' })
  export class ConfiguracionEntrega {
    @PrimaryGeneratedColumn({ name: 'Configuracion_Entrega_ID' })
    id: number;
  
    @Column({ name: 'Plazo_Entrega', type: 'timestamp with time zone', nullable: true })
    fechaEntrega: Date | null;
  
    @Column({ name: 'Plazo_Calificacion', type: 'timestamp with time zone' })
    fechaCalificacion: Date;
  
    @ManyToOne(() => TipoEntrega)
    @JoinColumn({ name: 'Tipo_Entrega_ID' })
    configuracion: TipoEntrega;

    @Column({ name: 'Porcentaje_Entrega', type: 'int'})
    porcentaje: number;

    @Column({ name: 'Rol_ID', type: 'int'})
    rolId: number;

    @OneToMany(() => EntregaEquipoPpi, (equipoentrega) => equipoentrega.equipoentrega)
    equipoentrega: EntregaEquipoPpi[];
  }
  