import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HospitalDetailsService {

  hospitalDetails: any;

  removeDup = [];
  accountDetails = [];
  doctorDetails: any;

  constructor(private http: HttpClient, private toastController: ToastController, public router: Router) {
    this.getHospitalDetails();
  }

  getHospitalDetails() {
    this.http.get('https://healthservice-97887.firebaseio.com/accounts.json').pipe(
      map(responseData => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            this.accountDetails.push({ ...responseData[key], id: key })
          }
        }
        return this.accountDetails;
      })
    ).subscribe(getData => { });
  }

  filterItems(searchTerm: string, searchFor) {
    if (this.hospitalDetails != undefined) {
      if (searchTerm == "" || searchTerm == undefined && searchFor == "hospital") {
        return this.hospitalDetails;
      }
      else if (searchTerm != "" || searchTerm != undefined && searchFor == "hospital") {
        return this.hospitalDetails.filter(item => {
          return item.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1 || item.address.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1 || item.specialize.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1
        })
      }
      else {
        console.log("There might be some other error")
      }
    }
  }

  doctorSearch(searchTerm: string,id) {
    let doctorDetail = this.doctorDetails.filter((value)=>value.hospitalId == id);
    console.log(this.doctorDetails);
    if (this.doctorDetails.length > 0) {
      if (searchTerm == "") {
        return doctorDetail;
      }
      else{
        return doctorDetail.filter(item => {
          return item.name.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        })
      }
    }
  }

  async waitingMessage() {
    const toast = await this.toastController.create({
      message: 'Please wait for few seconds :)',
      position: "middle",
      duration: 2000,
      color: "primary"
    });
    toast.present();
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