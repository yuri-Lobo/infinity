import { CustomButton } from "./custom-buttons.model";

export class GridConfiguration {
  public customButtons: Array<CustomButton>;
  public serverSide?: boolean = false;
  public processing?: boolean = false;
  public columns?: DataTables.ColumnSettings[];
}
