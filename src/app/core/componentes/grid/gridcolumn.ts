import { DataTableGridColumnType } from "./models/enum";
export class GridColumn{

    public name: String;
    public alignment: String;
    public width: number;
    public propertyName: string;
    public type: DataTableGridColumnType 

    constructor(name: String, alignment: String = '', width: number = 0, propertyName: string = '', type:DataTableGridColumnType=1){
        this.name = name;
        this.alignment = alignment;
        this.width = width;
        this.propertyName = propertyName;
        this.type = type
    }

    public getWidthColumn(){
        if(this.width == 0){
            return '';
        }
        else{
            return 'width-' + this.width;
        }
    }

    public getHeaderAlignment(){
        if(this.alignment == '') return '';
        return "dt-head-" + this.alignment;
    }

    public getBodyAlighment(){
        if(this.alignment == '') return '';
        return "dt-body-" + this.alignment;
    }
}