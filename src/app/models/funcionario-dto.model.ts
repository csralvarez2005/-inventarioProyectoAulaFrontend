import { Rol } from './funcionario.model';

export interface FuncionarioDTO {
  tipo_documento: string;
  apellido_funcionario: string;
  cargo: string;
  celular: string;
  direccion: string;
  email: string;
  estado?: string;
  estado_civil: string;
  fecha_nacimiento: Date;
  genero: string;
  identificacion: string;
  nombre_funcionario: string;
  password?: string;
  rol: string;
  imagen_url?: string;
}