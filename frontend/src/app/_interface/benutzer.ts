export interface IBenutzer {
    id: number,
    username: string,
    name: string,
    first_name: string,
    last_name: string,
    is_active: boolean,
    is_verwaltung: boolean,
    is_benutzerverwaltung: boolean,
    is_staff: boolean,
    password: string
}
