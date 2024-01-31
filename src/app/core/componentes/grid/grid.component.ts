import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from "@angular/core";
import { GridRow } from "./gridrow";
import { Subject, Observable } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { GridColumn } from "./gridcolumn";
import { GridConfiguration, CustomButtonEvent } from "./models";
import { EventGridColunmChangeValue } from "./models/eventgridcolumnchangevalue";

@Component({
  selector: "grid-container",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })

  dtElement: DataTableDirective;
  private eventsSubscription: any;
  dtOptions: DataTables.Settings = {};
  @Input() all: boolean = false;

  @Input() columns: Array<GridColumn>;
  @Input() rows: Array<GridRow>;
  @Input() showEdit: boolean = true;
  @Input() showDelete: boolean = true;
  @Input() showSync: boolean = false;
  @Input() showHelper: boolean = false;
  @Input() showInfoData: boolean = true;
  @Input() disabled: boolean = false;
  @Input() select: boolean = false;
  @Input() selectAllOption: boolean = true;
  @Input() scrollable: boolean = false;
  @Input() clickable: boolean = false;
  @Input() dtTrigger: Subject<any> = new Subject();
  @Input() reload: Observable<void> = new Observable<void>();
  @Input() order: (string | number)[];
  @Input() configuracoes: GridConfiguration;
  @Input() SelectedIdsArray: Array<Number> = [];
  @Input() linhaInicial: number = 0;
  @Input() pesquisaInicial: string = '';
  @Input() pagination:
    | string
    | DataTables.AjaxSettings
    | DataTables.FunctionAjax;

  @Output() onSync = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onClick = new EventEmitter();
  @Output() onHelper = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onSelectAll = new EventEmitter();
  @Output() onClickCustomButton = new EventEmitter();
  @Output() onEventChangeColumn = new EventEmitter();

  constructor() { }

  ngOnDestroy() {
    if (this.showInfoData) {
      this.eventsSubscription.unsubscribe();
    }
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.pagination) this.dtTrigger.next();
  }

  ngOnInit() {
    this.eventsSubscription = this.reload.subscribe(() => this.rerender());

    this.dtOptions = {
      processing: true,
      deferRender: true,
      retrieve: true,
      searching: this.showInfoData,
      paging: this.showInfoData,
      ordering: this.showInfoData,
      info: this.showInfoData,
      order: this.order,
      ajax: this.pagination,
      responsive: this.pagination != undefined,
      serverSide: this.pagination != undefined,
      stripeClasses: [],
      columnDefs: [{ orderable: false, targets: 0 }],
      displayStart: this.linhaInicial,
      search:
      {
        search: this.pesquisaInicial,
        regex: false
      },
      language: {
        lengthMenu: "Mostrando _MENU_ registros por página",
        info: "Mostrando página _PAGE_ de _PAGES_",
        zeroRecords: "Sem registros",
        infoEmpty: "Não tem registros cadastrados",
        infoFiltered: "(Filtrados de _MAX_ registros)",
        search: "Pesquisar",
        processing: "Carregando",
        paginate: {
          next: "Próximo",
          previous: "Anterior",
          first: "Primeiro",
          last: "Último",
        },
        aria: {
          sortAscending: ": Ordenar colunas de forma ascendente",
          sortDescending: ": Ordenar colunas de forma descendente",
        },
      },
    };

    if (this.scrollable) {
      this.dtOptions["scrollCollapse"] = true;
      this.dtOptions["scrollY"] = "40vh";
    }
  }

  syncEvent(id: any) {
    if (!this.disabled) this.onSync.emit(id);
  }

  editEvent(id: any) {
    if (!this.disabled) this.onEdit.emit(id);
  }

  deleteEvent(id: any) {
    if (!this.disabled) this.onDelete.emit(id);
  }

  clickEvent(id: any) {
    if (!this.disabled) this.onClick.emit(id);
  }

  helperEvent(id: any) {
    if (!this.disabled) this.onHelper.emit(id);
  }

  clickCustomButton(emissor: string, event: any) {
    this.onClickCustomButton.emit(new CustomButtonEvent(emissor, event));
  }

  selectEvent(id: any) {
    this.all = this.rows.find((x) => x.selected == false) == null;
    this.rows.find((x) => x.id === id).selected = !this.rows.find(
      (x) => x.id === id
    ).selected;
    this.onSelect.emit(id);
  }

  selectAll() {
    if (this.rows) this.rows.forEach((x) => (x.selected = this.all));
    this.onSelectAll.emit();
  }

  rerender(): void {
    if (this.dtElement != undefined && this.dtElement.dtInstance != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload(null, false);
      });
    }
  }

  EventChangeColumn(id: any, value: any, row: any) {
    let event = new EventGridColunmChangeValue();
    event.rowId = id;
    event.value = value;
    event.data = row;
    this.onEventChangeColumn.emit(event);
  }

  parseBolean(value: any) {
    return value == "true" || value == "True" ? false : true;
  }

  checkSelectedId(id: Number) {
    if (this.SelectedIdsArray.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  isChecked(id: number, rowselected: boolean): boolean {
    if (rowselected == true) {
      return true;
    } else if (this.checkSelectedId(id) == true) {
      return true;
    } else if (this.all == true) {
      return true;
    } else {
      return false;
    }
  }
}
