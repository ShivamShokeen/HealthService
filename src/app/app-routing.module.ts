import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signin/:type',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./userprofile/userprofile.module').then( m => m.UserprofilePageModule)
  },
  {
    path: 'doctor-list/:id/:name',
    loadChildren: () => import('./home/doctor-list/doctor-list.module').then( m => m.DoctorListPageModule)
  },
  {
    path: 'booked-appointment',
    loadChildren: () => import('./booked-appointment/booked-appointment.module').then( m => m.BookedAppointmentPageModule)
  },
  {
    path: 'appointment/:for',
    loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'modify-appointment',
    loadChildren: () => import('./modify-appointment/modify-appointment.module').then( m => m.ModifyAppointmentPageModule)
  },
  {
    path: 'add-doctor/:for',
    loadChildren: () => import('./add-doctor/add-doctor.module').then( m => m.AddDoctorPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },  {
    path: 'update-doctor',
    loadChildren: () => import('./update-doctor/update-doctor.module').then( m => m.UpdateDoctorPageModule)
  },
  {
    path: 'appointment-schedule',
    loadChildren: () => import('./appointment-schedule/appointment-schedule.module').then( m => m.AppointmentSchedulePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
