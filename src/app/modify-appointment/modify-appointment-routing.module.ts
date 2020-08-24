import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyAppointmentPage } from './modify-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyAppointmentPageRoutingModule {}
