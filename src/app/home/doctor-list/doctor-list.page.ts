import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HospitalDetailsService } from '../../services/hospital-details.service';
import { ToastController } from '@ionic/angular';
import { UserCredentialsService } from 'src/app/services/user-credentials.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.page.html',
  styleUrls: ['./doctor-list.page.scss'],
})
export class DoctorListPage implements OnInit {

  urlParameter: number;
  hospitalName: string;
  getDoctor;
  public searchTerm: string = "";
  public doctorDetails: any;
  constructor(private router: Router, private route: ActivatedRoute, public hospitalService: HospitalDetailsService, public toastController: ToastController,public userCredentials: UserCredentialsService) { }

  ngOnInit() {
    this.urlParameter = this.route.snapshot.params['id'];
    this.hospitalName = this.route.snapshot.params['name']
    console.log(this.urlParameter);
    this.setFilteredItems();
    if (this.doctorDetails.length == 0) {
      this.noDoctorMessage();
      this.router.navigate(['/home']);
    }
  }

  setFilteredItems() {
    this.doctorDetails = this.hospitalService.filterItems(this.searchTerm, "doctor", this.urlParameter);
    console.log(this.doctorDetails)
  }

  bookAppointment(doctorId,hospitalId,image,phone,fees){
    if(!this.userCredentials.UID){
      this.router.navigate(['/signin/signin']);
      this.notLoginMessage();
    }
    else{
    console.log(doctorId);
    this.router.navigate(['/appointment/add'],{queryParams:{doctorId:doctorId,hospitalId:hospitalId,image:image,doctorPhone:phone,doctorFees:fees}});
    }
  }

  async noDoctorMessage() {
    const toast = await this.toastController.create({
      message: 'No doctor are available.',
      position: "middle",
      duration: 2000
    });
    toast.present();
  }

  async notLoginMessage() {
    const toast = await this.toastController.create({
      message: 'You are not loggedin.',
      position: "middle",
      duration: 2000
    });
    toast.present();
  }

}
