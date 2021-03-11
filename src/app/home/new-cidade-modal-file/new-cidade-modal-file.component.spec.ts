import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCidadeModalFileComponent } from './new-cidade-modal-file.component';

describe('NewCidadeModalFileComponent', () => {
  let component: NewCidadeModalFileComponent;
  let fixture: ComponentFixture<NewCidadeModalFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCidadeModalFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCidadeModalFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
