import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
export type SortDirection = "asc" | "desc" | "";
const rotate: { [key: string]: SortDirection } = {
  asc: "desc",
  desc: "",
  "": "asc",
};

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "th[sortable]",
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    "[class.asc]": 'direction === "asc"',
    "[class.desc]": 'direction === "desc"',
    "(click)": "rotate()",
  },
})
export class AdvancedSortableDirective {
  constructor(public modalService: NgbModal) {}
  @Input() sortable: string;
  @Input() direction: SortDirection = "";
  @Output() sort = new EventEmitter<SortEvent>();
  /**
   * Responsive modal open
   * @param responsiveData responsive modal data
   */
  responsiveModal(responsiveData: string) {
    this.modalService.open(responsiveData);
  }
  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
