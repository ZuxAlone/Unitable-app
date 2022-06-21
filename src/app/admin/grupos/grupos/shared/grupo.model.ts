export interface Grupo {
    id: number,
    status: boolean,
    nombre: string,
    descripcion: string,
    fechaCreacion: Date,
    numUsuarios: number,
    temaId: number,
    tema: Tema,
    chatId: number,
    chat: Chat
}

export interface Chat {
    id: number,
    status: boolean,
    detalle: string,
    cantMensajes: number
}

export interface Tema {
    id: number,
    status: boolean,
    nombre: string,
    contenido: string,
    cursoId: number,
    curso: Curso
}
export interface Curso{
    id: number,
    status: boolean,
    nombre: string,
    descripcion: string
}

export interface GrupoRequest{
    nombre: string,
    descripcion: string,
    detalleChat: string,
    temaId: number
}

export interface TemaRequest {
    nombre: string,
    contenido: string,
    cursoId: number
}

export interface CursoRequest {
    nombre: string,
    descripcion: string
}

export interface GrupoResponse{
    nombre: string,
    descripcion: string,
    fechaCreacion: Date,
    numUsuarios: number,
    temaId: number,
    tema: any,
    chatId: number,
    chat: any,
    id: number,
    status: boolean
  }

export interface Mensaje{
    mensajeTexto: string,
    horaMensaje: Date,
    usuarioId: number,
    usuario: any,
    chatId: number,
    chat: any,
    id: number,
    status: boolean
}