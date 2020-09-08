import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController, ToastController } from '@ionic/angular';
import { UserCredentialsService } from '../services/user-credentials.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.page.html',
  styleUrls: ['./appointment-schedule.page.scss'],
})
export class AppointmentSchedulePage implements OnInit {

  listedAppointments: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient, public modalController: ModalController, public toastController: ToastController, public userCredentials: UserCredentialsService) {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    let duplicateData = [];
    let filterCondition: any;
    let reference: any;
    reference = firebase.database().ref('/appointmentDetails').on("value", (snapshot) => {
      let index: string;
      for (index in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(index)) {
          duplicateData.push({ ...snapshot.val()[index], id: index });
          filterCondition = duplicateData.filter((value) => value.hospitalId == this.userCredentials.userId);
          this.listedAppointments = filterCondition;
          console.log(this.listedAppointments);
        }
      }
    })
  }

  deleteAppointment(appointmentId) {
    let specificUrl: string;
    specificUrl = 'https://healthservice-97887.firebaseio.com/appointmentDetails/' + appointmentId + '.json';
    this.http.delete(specificUrl).subscribe(data => {
      this.deletedAppointmentMessage();
      this.router.navigate(['/home']);
    })
  }

  async deletedAppointmentMessage() {
    const toast = await this.toastController.create({
      message: "Appointment deleted successfully :)",
      duration: 3000,
      position: "middle",
      color: "success"
    });
    toast.present();
  }

}
