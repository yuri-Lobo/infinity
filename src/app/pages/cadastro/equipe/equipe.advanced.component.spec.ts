import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { EquipeListaComponent } from "./equipe.lista.component";

describe("AdvancedComponent", () => {
  let component: EquipeListaComponent;
  let fixture: ComponentFixture<EquipeListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EquipeListaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
