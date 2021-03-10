import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [HeaderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('a - handle scroll ', () => {
    component.handleScroll()
    expect(component.isActive).toEqual(false);
    expect(fixture.debugElement.nativeElement.querySelector('.scrollClass')).not.toBeTruthy();
    Object.defineProperty(window, 'scrollY', { value: 100 });
    component.handleScroll()
    expect(fixture.debugElement.nativeElement.querySelector('.scrollClass')).toBeTruthy();
  });

});
