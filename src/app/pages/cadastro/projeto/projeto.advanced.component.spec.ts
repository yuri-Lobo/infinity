import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ProjetoListaComponent } from "../projeto/projeto.lista.component";


describe("AdvancedComponent", () => {
  let component: ProjetoListaComponent;
  let fixture: ComponentFixture<ProjetoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetoListaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
