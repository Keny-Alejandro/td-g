import { CitasAsesoriaPpi } from "src/citas_asesoria_ppi/entities/citas_asesoria_ppi.entity";

export class CreateSeguimientoPpiDto { 
    id: number;
    fecha: Date;  
    semana: string | null;
    compromiso: string | null;
    observacion: string | null; 
    asistencia: JSON;
    citas: CitasAsesoriaPpi;
    estudiante1: string | null; 
    estudiante2: string | null; 
    estudiante3: string | null; 
    asistenciaEstudiante1: number | null;  
    asistenciaEstudiante2: number | null;  
    asistenciaEstudiante3: number | null; 
}
