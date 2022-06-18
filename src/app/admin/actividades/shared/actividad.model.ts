export interface Actividad {
    id: number;
    status: boolean;
    nombre: string;
    detalle: string;
    horaIni: Date;
    horaFin: Date;
    duracionMin: number;
    activa: boolean;
    usuarioId: number;
    temaId: number;
    usuario: Usuario;
    tema: Tema;
}

export interface ActividadReq{
    nombre: string;
    detalle: string;
    horaIni: Date;
    horaFin: Date;
    temaId: number;
}

export interface Tema{
    id: number;
    status: boolean;
    nombre: string;
    contenido: string;
    cursoId: number;
    curso: Curso;
}

export interface Curso{
    id: number;
    status: boolean;
    nombre: string;
    descripcion: string;
}

export interface Test{
    id: number;
    status: boolean;
    nombre: string;
    descripcion: string;
    temaId: number;
    tema: Tema;
}

export interface Pregunta{
    id: number;
    status: boolean;
    preguntaText: string;
    testId: number;
    test: Test;
}

export interface Respuesta{
    id: number;
    status: boolean;
    respuestaText: string;
    isCorrect: boolean;
    preguntaId: number;
    pregunta: Pregunta;
}

export interface Usuario{
    id: number;
    status: boolean;
    nombres: string;
    apellidos: string;
    correo: string;
    password: string;
    carrera: string;
    numActCompletas: number;
    numTestAprobados: number;
    numModenas: number;
    isPremium: boolean;
    tipo: number;
}
