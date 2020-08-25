import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserCredentialsService } from '../services/user-credentials.service';
import { HospitalDetailsService } from '../services/hospital-details.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  urlParameter: string;
  hospitalDetails: any;
  securityDeposit: number;
  addAppointment = {
    userId: this.userCredentials.userId,
    doctorId: this.route.snapshot.queryParamMap.get('doctorId'),
    hospitalId: this.route.snapshot.queryParamMap.get('hospitalId'),
    name: "",
    aadhaarCard: "",
    dateAndTime: "",
    phoneNumber: "",
    alternativeNumber: "",
    disease: "",
    doctorNumber: this.route.snapshot.queryParamMap.get('doctorPhone'),
    hospitalNumber: 0,
    location: "",
    insuranceSupport: "",
    hospitalSpecialize: "",
    hospitalEmailid: "",
    symptoms: "",
    howManyDays: "",
    age: "",
    ancestorDisease: "",
    anyRecentTreatment: "",
    doctorImage: this.route.snapshot.queryParamMap.get('image'),
    securityDeposit: 0
  }
  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient, public modalController: ModalController, public toastController: ToastController, public userCredentials: UserCredentialsService, public hospitalService: HospitalDetailsService,) {
    if (!this.userCredentials.userId) {
      this.router.navigate(['/home']);
    }
    else {
      this.urlParameter = this.route.snapshot.params['for'];
      this.hospitalDetails = this.hospitalService.hospitalDetails.find((value) => value.id == this.route.snapshot.queryParamMap.get('hospitalId'));
      if (this.hospitalDetails) {
        this.addAppointment.hospitalNumber = this.hospitalDetails.phone;
        this.addAppointment.location = this.hospitalDetails.address;
        this.addAppointment.insuranceSupport = this.hospitalDetails.insuranceSupport;
        this.addAppointment.hospitalSpecialize = this.hospitalDetails.specialize;
        this.addAppointment.hospitalEmailid = this.hospitalDetails.emailid;
      }
      let fees: any;
      fees = this.route.snapshot.queryParamMap.get('doctorFees');
      this.securityDeposit = fees / 2;
      if (this.securityDeposit != 0) {
        this.addAppointment.securityDeposit = this.securityDeposit;
      }
    }
  }

  ngOnInit() {
  }

  submit(form: NgForm) {
    if (form.valid) {
      this.http.post('https://healthservice-97887.firebaseio.com/appointmentDetails.json', this.addAppointment).subscribe(data => {
        this.appointmentTimeMessage();
        this.router.navigate(['/home']);
        this.successfullyBookedMessage();
      })
    }
    else {
      this.emptyFieldMessage();
    }
  }

  async emptyFieldMessage() {
    const toast = await this.toastController.create({
      message: "Field should not be empty :)",
      duration: 2000,
      position: "middle",
      color: "danger"
    });
    toast.present();
  }

  async appointmentTimeMessage() {
    const toast = await this.toastController.create({
      message: "Your appointment is valid from the time you selected it that is for 1 hour only :)",
      duration: 8000,
      position: "middle",
      color: "medium"
    });
    toast.present();
  }

  async successfullyBookedMessage() {
    const toast = await this.toastController.create({
      message: "Appointment booked successfully :)",
      duration: 3000,
      position: "middle",
      color: "medium"
    });
    toast.present();
  }

}
