import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateDoctorPage } from './update-doctor.page';

describe('UpdateDoctorPage', () => {
  let component: UpdateDoctorPage;
  let fixture: ComponentFixture<UpdateDoctorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDoctorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
