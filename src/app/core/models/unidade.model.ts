import { BaseResourceModel } from "./base-resource.model";

export class Unidade extends BaseResourceModel {
    constructor(
        public nome?: string,
        public sigla?: string,
        public status?: string,
        public email?: string,
    ) { super(); }

    static fromJson(jsonData: any): Unidade {
        return Object.assign(new Unidade(), jsonData);
    }
}