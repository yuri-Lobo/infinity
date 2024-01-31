import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ServicoListaComponent } from "./servico.lista.component";

describe("AdvancedComponent", () => {
  let component: ServicoListaComponent;
  let fixture: ComponentFixture<ServicoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServicoListaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
