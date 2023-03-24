import { ComponentFixture, TestBed } from '@angular/core/testing';

import { sendComponent } from './send.component';

describe('SentEmailsComponent', () => {
  let component: sendComponent;
  let fixture: ComponentFixture<sendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ sendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(sendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
