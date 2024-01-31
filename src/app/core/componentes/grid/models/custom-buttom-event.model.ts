export class CustomButtonEvent {
  public emissor: string;
  public event: any;

  constructor(emissor: string, event: any) {
    this.emissor = emissor;
    this.event = event;
  }
}
