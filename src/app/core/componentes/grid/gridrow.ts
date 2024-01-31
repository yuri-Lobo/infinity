export class GridRow {
    
    public columns: Array<string>;
    public id: any;
    public selected: boolean = false;
    public showSync: boolean = false;

    constructor(...columns:string[]) {
        this.columns = columns;
        this.selected = false;
    }

    public setId(id: any): GridRow {
        this.id = id;
        return this;
    }

    public setSelected(selected: boolean): GridRow {
        this.selected = selected;
        return this;
    }

    public setShowSync(showSync: boolean): GridRow {
        this.showSync = showSync;
        return this;
    }
}