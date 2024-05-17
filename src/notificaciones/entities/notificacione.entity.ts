import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Notificaciones' })
export class Notificacione {
    @PrimaryGeneratedColumn({ name: 'Notificacion_ID' })
    id: number;

    @Column({ name: 'Mensaje_Notificacion', type: 'varchar' })
    mensaje: string | null;

    @Column({ name: 'Tipo_Notificacion', type: 'int' })
    tipo: number;

    @Column({ name: 'Redireccion_Notificacion', type: 'int' })
    redireccion: number;

    @Column({ name: 'Estado_Notificacion', type: 'int' })
    estado: number;
}
