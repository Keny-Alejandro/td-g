import { EquipoPpi } from "src/equipo_ppi/entities/equipo_ppi.entity";
import { EstadoCita } from "src/estado_cita/entities/estado_cita.entity";
import { ObservacionCita } from "src/observacion_cita/entities/observacion_cita.entity";
import { SeguimientoPpi } from "src/seguimiento_ppi/entities/seguimiento_ppi.entity";
import { TipoCita } from "src/tipo_cita/entities/tipo_cita.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

export class CreateCitasAsesoriaPpiDto {
    id: number;
    fecha: Date;
    hora: Date;
    link: string;
    modificaciones: string;
    estadoCita: EstadoCita;
    tipoCita: TipoCita;
    observacionCita: ObservacionCita;
    equipocita: EquipoPpi;
    usuariocitaequipo: Usuario;
    citas: SeguimientoPpi[];
}
