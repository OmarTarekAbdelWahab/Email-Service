import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfoldersComponent } from './myfolders.component';

describe('MyfoldersComponent', () => {
  let component: MyfoldersComponent;
  let fixture: ComponentFixture<MyfoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyfoldersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyfoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
