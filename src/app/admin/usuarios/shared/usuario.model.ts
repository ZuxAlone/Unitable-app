export class Usuario {
    nombres?: string;
    apellidos?: string;
    correo?: string;
    password?: string;
    carrera?: string;
    numActCompletas?: number;
    numTestAprobados?: number;
    numMonedas?: number;
    isPremium?: boolean;
    tipo?: number;
}

export class UsuarioEdit {
    nombres?: string;
    apellidos?: string;
    carrera?: string;
    tipo?: number;
}
