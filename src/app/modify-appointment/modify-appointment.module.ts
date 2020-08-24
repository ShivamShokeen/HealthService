import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyAppointmentPageRoutingModule } from './modify-appointment-routing.module';

import { ModifyAppointmentPage } from './modify-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyAppointmentPageRoutingModule
  ],
  declarations: [ModifyAppointmentPage]
})
export class ModifyAppointmentPageModule {}
