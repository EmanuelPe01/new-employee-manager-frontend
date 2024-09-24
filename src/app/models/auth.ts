export interface EmployeeInfo {
    id?: string,
    name: string,
    firstSurname: string,
    secondSurname: string,
    email: string,
    curp: string,
    puesto_id: string,
    estado_id: string,
    password: string,
    rol: string
}

export interface EmployeeInfoItem {
    id: string,
    fullName: string,
    email: string,
    curp: string,
    puesto: string,
    departamento: string,
    estado: string,
    rol: string
}

export interface LoginInfo {
    email: string,
    password: string
}

export interface SessionInfo {
    token: string,
    rol: string,
    nombre: string,
    email: string
}
