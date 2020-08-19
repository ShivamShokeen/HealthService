import { Component, OnInit } from '@angular/core';
import { HospitalDetailsService } from './hospital-details.service';
import { CalendarComponentOptions, CalendarModalOptions } from 'ion2-calendar';
import * as moment from 'moment';

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


  constructor(public hospitalService: HospitalDetailsService) {
    this.appointmentToDate = 1;
    console.log(new Date(Date.now() + 24 * 3600 * 1000 * this.appointmentToDate))
    console.log(Date.now())
  }
  ngOnInit() {
    this.filteringSearch();
  }


  onChange($event) {
    console.log($event);
    // console.log("From: " + moment(this.dateRange.from).format('MMMM Do YYYY, h:mm:ss a'))
    // console.log("To: " + moment(this.dateRange.to).format('MMMM Do YYYY, h:mm:ss a'))

    this.appointmentSchedule = {
      from: moment(this.dateRange.from).format('MMMM Do YYYY, h:mm:ss a'),
      to: moment(this.dateRange.to).format('MMMM Do YYYY, h:mm:ss a'),
      timing: "",
      userId: "",
      doctorId: "" 
    }

    console.log(this.appointmentSchedule)
    console.log(new Date(Date.now() + 24 * 60 * 60 * 1000 * 90));
    console.log(new Date(Date.now() + 24 * 3600 * 1000 * this.appointmentToDate))
  }
  filteringSearch() {
    this.hospitals = this.hospitalService.filterItems(this.searchTerm, "hospital")
  }

}
