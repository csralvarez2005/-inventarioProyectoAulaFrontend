export interface Funcionario {
    id: number;
    tipo_documento: string;
    apellido_funcionario: string;
    cargo: string;
    celular: string;
    direccion: string;
    email: string;
    estado: string;
    estado_civil: string;
    fecha_nacimiento: string; // puede ser Date si se parsea
    genero: string;
    identificacion: string;
    nombre_funcionario: string;
  }