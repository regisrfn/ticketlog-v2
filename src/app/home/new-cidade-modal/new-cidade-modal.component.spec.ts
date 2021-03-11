import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCidadeModalComponent } from './new-cidade-modal.component';

describe('NewCidadeModalComponent', () => {
  let component: NewCidadeModalComponent;
  let fixture: ComponentFixture<NewCidadeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCidadeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCidadeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
