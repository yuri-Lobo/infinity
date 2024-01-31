import { EnumAlert } from "./enumalert";

export class ResultAlert {
  type: EnumAlert;
  message: string;

  public getClasseCss(): string {
    switch (this.type) {
      case EnumAlert.danger:
        return "danger";
      case EnumAlert.info:
        return "info";
      case EnumAlert.success:
        return "success";
      case EnumAlert.warning:
        return "warning";
    }
  }
}
