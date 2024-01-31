import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EnumAlert } from "./enumalert";
import { ResultAlert } from "./resultalert";

@Component({
  selector: "modalform-container",
  templateUrl: "./modalform.component.html",
})
export class ModalFormComponent implements OnInit {
  @Input() title: string;
  @Input() formGroup: FormGroup;
  @Input() resultAlert: ResultAlert;
  @Input() showActionButtons: boolean = true;
  @Input() showHelper: boolean = false;
  @Input() showAction: boolean = true;
  @Input() showExport: boolean = false;
  @Input() showLimpar: boolean = true;
  @Input() labelHelper: string;
  @Input() modalBodyClass: string = "";
  @Input() disabledBtnLimpar: boolean = false;
  @Input() disabledBtnReplanejar: boolean = false;
  @Input() disabledBtnSalvar: boolean = false;
  @Input() exporting: boolean = false;
  @Input() salvando: boolean = undefined;

  @Output() onSubmit = new EventEmitter();
  @Output() onExport = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onHelper = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void { }

  closeAlert() {
    this.resultAlert = null;
  }

  getAlertCss(type: EnumAlert) {
    switch (type) {
      case EnumAlert.success:
        return "success";
      case EnumAlert.info:
        return "info";
      case EnumAlert.warning:
        return "warning";
      case EnumAlert.danger:
        return "danger";
      default:
        return "";
    }
  }

  get formControl() {
    return this.formGroup.controls;
  }

  onSubmitEvent() {
    this.onSubmit.emit(this.formControl);
  }

  onExportEvent() {
    this.onExport.emit(this.formControl);
  }

  onClearEvent() {
    this.formGroup.reset();
    this.onClear.emit();
  }

  onHelperEvent() {
    this.onHelper.emit(this.formControl);
  }

  keyPress(event) {
    //console.log(event);
  }
}
