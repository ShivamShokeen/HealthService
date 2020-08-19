import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HospitalDetailsService } from '../hospital-details.service';
import { ToastController } from '@ionic/angular';

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
  constructor(private router: Router, private route: ActivatedRoute, public hospitalService: HospitalDetailsService, public toastController: ToastController) { }

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
  }
  async noDoctorMessage() {
    const toast = await this.toastController.create({
      message: 'No doctor are available.',
      position: "middle",
      duration: 2000
    });
    toast.present();
  }

}
