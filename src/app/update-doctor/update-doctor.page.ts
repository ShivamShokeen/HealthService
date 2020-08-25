import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UserCredentialsService } from '../services/user-credentials.service';
import { HospitalDetailsService } from '../services/hospital-details.service';
import { FormGroup, FormControl, NgForm, } from '@angular/forms';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.page.html',
  styleUrls: ['./update-doctor.page.scss'],
})
export class UpdateDoctorPage implements OnInit {

  hospitalId: string;
  doctorId: string;
  doctorDetails: any;

  editDoctor: FormGroup;

  constructor(private router: Router, public route: ActivatedRoute, public toastController: ToastController, private http: HttpClient, public userCredentials: UserCredentialsService, public hospitalDetails: HospitalDetailsService) {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/home']);
    }
    else {
      this.hospitalId = this.route.snapshot.queryParams['hospitalId'];
      this.doctorId = this.route.snapshot.queryParams['doctorId'];
      this.doctorDetails = this.hospitalDetails.doctorDetails.find((value) => value.hospitalId == this.hospitalId && value.id == this.doctorId)
    }
  }

  ngOnInit() {
    this.editDoctor = new FormGroup({
      'name': new FormControl(this.doctorDetails.name),
      'address': new FormControl(this.doctorDetails.address),
      'appointmentSlots': new FormControl(this.doctorDetails.appointmentSlots),
      'city': new FormControl(this.doctorDetails.city),
      'country': new FormControl(this.doctorDetails.country),
      'degree': new FormControl(this.doctorDetails.degree),
      'emailid': new FormControl(this.doctorDetails.emailid),
      'experience': new FormControl(this.doctorDetails.experience),
      'facilities': new FormControl(this.doctorDetails.facilities),
      'fees': new FormControl(this.doctorDetails.fees),
      'image': new FormControl(this.doctorDetails.image),
      'languagesSpoken': new FormControl(this.doctorDetails.languagesSpoken),
      'password': new FormControl(this.doctorDetails.password),
      'phone': new FormControl(this.doctorDetails.phone),
      'specialize': new FormControl(this.doctorDetails.specialize),
      'timing': new FormControl(this.doctorDetails.timing),
      'workingDay': new FormControl(this.doctorDetails.workingDay),
      'workingShift': new FormControl(this.doctorDetails.workingShift),
      'zipcode': new FormControl(this.doctorDetails.zipcode)
    })
  }

  updateData(form: NgForm) {
    let specificUrl: string;
    let customizedObject: any;
    specificUrl = 'https://healthservice-97887.firebaseio.com/doctors/' + this.doctorId + '.json';
    if (form.valid) {
      customizedObject = {
        address: form.value.address,
        appointmentSlots: this.doctorDetails.appointmentSlots,
        city: form.value.city,
        country: form.value.country,
        createdByName: this.doctorDetails.createdByName,
        degree: form.value.degree,
        emailid: form.value.emailid,
        experience: form.value.experience,
        facilities: form.value.facilities,
        fees: form.value.fees,
        hospitalId: this.doctorDetails.hospitalId,
        hospitalName: this.doctorDetails.hospitalName,
        image: form.value.image,
        languagesSpoken: form.value.languagesSpoken,
        name: form.value.name,
        password: form.value.password,
        phone: form.value.phone,
        registrationNumber: this.doctorDetails.registrationNumber,
        specialize: form.value.specialize,
        timing: form.value.timing,
        workingDay: form.value.workingDay,
        workingShift: form.value.workingShift,
        zipcode: form.value.zipcode,
      }
      this.http.put(specificUrl,customizedObject).subscribe(data =>{
        this.successMessage();
        this.router.navigate(['/home']);
      })
    }
    else{
      this.emptyMessage();
    }
  }

  async successMessage() {
    const toast = await this.toastController.create({
      message: 'Updated successfully.',
      duration: 2000
    });
    toast.present();
  }

  async emptyMessage() {
    const toast = await this.toastController.create({
      message: 'Field are empty.',
      duration: 5000,
      position: "middle",
      color: "danger"
    });
    toast.present();
  }
}
