import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedAppointmentPage } from './booked-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: BookedAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookedAppointmentPageRoutingModule {}
