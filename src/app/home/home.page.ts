import { Component, OnInit } from '@angular/core';
import { HospitalDetailsService } from '../services/hospital-details.service';
import { CalendarComponentOptions, CalendarModalOptions } from 'ion2-calendar';
import * as moment from 'moment';
import { UserCredentialsService } from '../services/user-credentials.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  hospitals: any;
  searchTerm: string;
  appointmentToDate: number;

  appointmentSchedule = {
    from: "",
    to: "",
    timing: "",
    userId: "",
    doctorId: ""
  }

  // dateRange: { from: string; to: string; };
  dateRange: {
    from: Date;
    to: Date,
    // daysConfig: this.test
  }
  // } = {
  //     from: new Date(Date.now()),
  //     to: new Date(Date.now() + 24 * 3600 * 1000 * 2)
  //   };
  type: 'moment';

  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    color: "secondary",
    // defaultDateRange: this.dateRange,
    // to : new Date() '+2',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    monthPickerFormat: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };


  constructor(public hospitalService: HospitalDetailsService, public userCredentials: UserCredentialsService, private http: HttpClient, private toastController: ToastController,) {

    this.appointmentToDate = 1;
    if(this.hospitalService.hospitalDetails == undefined){
      this.waitingMessage();
    }    
    let filterCondition: any;
    let referance;
    let duplicateData = [];
    let removeDup: any;
    referance = firebase.database().ref('/accounts').on("value", (snapshot) => {
      for (const key in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(key)) {
          filterCondition = { ...snapshot.val()[key], id: key };
          if (filterCondition.type == 'hospital') {
            duplicateData.push(filterCondition);
            removeDup = duplicateData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
            this.hospitalService.hospitalDetails = removeDup;
            this.filteringSearch();
          }
        }
      }
    });
  }
  ngOnInit() {

  }


  onChange($event) {
    // console.log("From: " + moment(this.dateRange.from).format('MMMM Do YYYY, h:mm:ss a'))
    // console.log("To: " + moment(this.dateRange.to).format('MMMM Do YYYY, h:mm:ss a'))

    this.appointmentSchedule = {
      from: moment(this.dateRange.from).format('MMMM Do YYYY, h:mm:ss a'),
      to: moment(this.dateRange.to).format('MMMM Do YYYY, h:mm:ss a'),
      timing: "",
      userId: "",
      doctorId: ""
    }

    // console.log(this.appointmentSchedule)
    // console.log(new Date(Date.now() + 24 * 60 * 60 * 1000 * 90));
    // console.log(new Date(Date.now() + 24 * 3600 * 1000 * this.appointmentToDate))
  }
  filteringSearch() {
    this.hospitals = this.hospitalService.filterItems(this.searchTerm, "hospital");
  }

  async waitingMessage() {
    const toast = await this.toastController.create({
      message: 'Please wait for 2 seconds :)',
      position: "middle",
      duration: 2000,
      color: "primary"
    });
    toast.present();
  }
  
}
