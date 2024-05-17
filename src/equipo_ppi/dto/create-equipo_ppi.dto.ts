import { CitasAsesoriaPpi } from "src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity";
import { EntregaEquipoPpi } from "src/entrega_equipo_ppi/entities/entrega_equipo_ppi.entity";

export class CreateEquipoPpiDto {
    id: number;
    codigoEquipo: number;
    nombre: string;
    descripcion: string;
    alcance: string;
    socializacionuno: string;
    socializaciondos: string;
    canceladas: JSON;
    configuracionentrega: EntregaEquipoPpi[];
    equipocita: CitasAsesoriaPpi[];
}
