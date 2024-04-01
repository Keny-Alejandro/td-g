/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EquipoPpi } from 'src/equipo_ppi/entities/equipo_ppi.entity';
import { ConfiguracionEntrega } from 'src/configuracion_entrega/entities/configuracion_entrega.entity';

@Entity({ name: 'Entrega_Equipo_PPI' })
export class EntregaEquipoPpi {
    @PrimaryGeneratedColumn({ name: 'Entrega_Equipo_PPI_ID' })
    id: number;

    @Column({ name: 'Ubicacion_Entrega', type: 'varchar', length: 255})
    ubicacion: string;

    @Column({ name: 'Calificacion_Entrega', type: 'decimal', precision: 6, scale: 4 })
    calificacion: number;    

    @Column({ name: 'Porcentaje_Entrega', type: 'int'})
    porcentaje: number;

    @ManyToOne(() => EquipoPpi)
    @JoinColumn({ name: 'Equipo_PPI_ID' })
    equipoentrega: EquipoPpi;
  
    @ManyToOne(() => ConfiguracionEntrega)
    @JoinColumn({ name: 'Configuracion_Entrega_ID' })
    configuracionentrega: ConfiguracionEntrega;
}