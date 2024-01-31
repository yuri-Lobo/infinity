import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FuncionarioListaComponent } from "./funcionario.lista.component";

describe("AdvancedComponent", () => {
  let component: FuncionarioListaComponent;
  let fixture: ComponentFixture<FuncionarioListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioListaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
