import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateDoctorPage } from './update-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateDoctorPageRoutingModule {}
