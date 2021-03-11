import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCidadeFromFileComponent } from './new-cidade-from-file.component';

describe('NewCidadeFromFileComponent', () => {
  let component: NewCidadeFromFileComponent;
  let fixture: ComponentFixture<NewCidadeFromFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCidadeFromFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCidadeFromFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
