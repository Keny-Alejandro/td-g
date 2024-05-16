/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity({ name: 'Equipo_PPI_PJIC' })
export class EquipoPpiPjic {
    @PrimaryGeneratedColumn({ name: 'Equipo_PPI_PJIC_ID' })
    id: number;

    @Column({ name: 'Codigo_Equipo', type: 'int' })
    codigoEquipo: number;
  
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'Usuario_ID' })
    usuariopjic: Usuario;

}