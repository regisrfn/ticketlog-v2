import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCidadeComponent } from './new-cidade.component';

describe('NewCidadeComponent', () => {
  let component: NewCidadeComponent;
  let fixture: ComponentFixture<NewCidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
