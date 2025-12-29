import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRidesComponent } from './group-rides.component';

describe('GroupRidesComponent', () => {
  let component: GroupRidesComponent;
  let fixture: ComponentFixture<GroupRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupRidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
