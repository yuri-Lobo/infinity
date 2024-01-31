import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FuncaoListaComponent } from "./funcao.lista.component";


describe('AdvancedComponent', () => {
  let component: FuncaoListaComponent;
  let fixture: ComponentFixture<FuncaoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncaoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
