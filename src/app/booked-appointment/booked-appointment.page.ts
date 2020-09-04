import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController, ToastController } from '@ionic/angular';
import { UserCredentialsService } from '../services/user-credentials.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-booked-appointment',
  templateUrl: './booked-appointment.page.html',
  styleUrls: ['./booked-appointment.page.scss'],
})
export class BookedAppointmentPage implements OnInit {

  bookedAppointments: any;
  appointmentList: any;
  hospitalStaffBookedAppointments: any;
  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient, public modalController: ModalController, public toastController: ToastController, public userCredentials: UserCredentialsService) {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    let listedAppointments = [];
    let filterCondition: any;
    let getHospitalStaffBookedAppointment: any;
    let reference: any;
    reference = firebase.database().ref('/appointmentDetails').on("value", (snapshot) => {
      this.appointmentList = snapshot.val();
      let index: string;
      for (index in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(index)) {
          listedAppointments.push({ ...snapshot.val()[index], id: index });
          filterCondition = listedAppointments.filter((value) => value.userId == this.userCredentials.userId);
          this.bookedAppointments = filterCondition;
          getHospitalStaffBookedAppointment = listedAppointments.filter((value) => value.hospitalId == this.userCredentials.userId);
          this.hospitalStaffBookedAppointments = getHospitalStaffBookedAppointment;
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

  async waitingMessage() {
    const toast = await this.toastController.create({
      message: "Please wait for 3 seconds :)",
      duration: 3000,
      position: "middle",
      color: "primary"
    });
    toast.present();
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
