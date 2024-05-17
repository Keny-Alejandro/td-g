import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Semanas' })
export class Semana { 
    @PrimaryGeneratedColumn({ name: 'Semanas_ID' })
    id: number;

    @Column({ name: 'Numero_Semana', type: 'int'})
    numeroSemana: string | null;

    @Column({ name: 'Fecha_Inicio', type: 'timestamp with time zone' })
    fechaInicio: Date;

    @Column({ name: 'Fecha_Fin', type: 'timestamp with time zone' })
    fechaFin: Date;
}
