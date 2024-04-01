/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ConfiguracionEntrega } from 'src/configuracion_entrega/entities/configuracion_entrega.entity';

@Entity({ name: 'Tipo_Entrega' })
export class TipoEntrega {
  @PrimaryGeneratedColumn({ name: 'Tipo_Entrega_ID' })
  id: number;

  @Column({ name: 'Tipo_Entrega_Descripcion' })
  nombre: string;

  @OneToMany(() => ConfiguracionEntrega, (configuracion) => configuracion.configuracion)
  configuracion: ConfiguracionEntrega[];

}
