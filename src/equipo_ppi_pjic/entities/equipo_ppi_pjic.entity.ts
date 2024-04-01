/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EquipoUsuario } from 'src/equipo_usuarios/entities/equipo_usuario.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity({ name: 'Equipo_PPI_PJIC' })
export class EquipoPpiPjic {
    @PrimaryGeneratedColumn({ name: 'Equipo_PPI_PJIC_ID' })
    id: number;

    @ManyToOne(() => EquipoUsuario)
    @JoinColumn({ name: 'Equipo_Usuario_ID' })
    equipousuariopjic: EquipoUsuario;
  
    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'Usuario_ID' })
    usuariopjic: Usuario;
}