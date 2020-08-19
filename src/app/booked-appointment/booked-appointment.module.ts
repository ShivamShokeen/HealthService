import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookedAppointmentPageRoutingModule } from './booked-appointment-routing.module';

import { BookedAppointmentPage } from './booked-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookedAppointmentPageRoutingModule
  ],
  declarations: [BookedAppointmentPage]
})
export class BookedAppointmentPageModule {}
