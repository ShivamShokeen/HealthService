import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateDoctorPageRoutingModule } from './update-doctor-routing.module';

import { UpdateDoctorPage } from './update-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateDoctorPageRoutingModule
  ],
  declarations: [UpdateDoctorPage]
})
export class UpdateDoctorPageModule {}
