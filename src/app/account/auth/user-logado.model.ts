import { Usuario } from "src/app/core/models/usuario.models";

export class UserLogado {
    constructor(
        public token?: string,
        public user?: Usuario,
        public roles?: string[],
    ) { }
}