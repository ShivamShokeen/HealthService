import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class HospitalDetailsService {

  hospitalDetails= [];

  removeDup = [];
  accountDetails = [];
  doctorDetails = [];

  constructor(private http: HttpClient, private toastController: ToastController,) { 
    
    // let filterCondition: any;
    // let referance;
    // referance = firebase.database().ref('/accounts').on("value", function (snapshot) {
    //   console.log(snapshot.val);
    //   console.log(snapshot.val());
    //   for (const key in snapshot.val()) {
    //     if (snapshot.val().hasOwnProperty(key)) {
    //       filterCondition = { ...snapshot.val()[key], id: key };
          
    //       if(filterCondition.type == 'hospital'){
    //         console.log(filterCondition)
    //         if(filterCondition == undefined || filterCondition == null ){
    //           console.log("nulll/undefined")
    //         }
    //         else{
              
    
    //           //this.hospitalDetails.push(filterCondition);
    //           //console.log(this.hospitalDetails);
    //         }
    //       }
    //     }
    //   }
    // });
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
    ).subscribe(getData => {
      //  console.log(getData);
    });

    let filterConditions: any;
    this.http.get('https://healthservice-97887.firebaseio.com/accounts.json').pipe(
      map(responseData => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            filterConditions = { ...responseData[key], id: key };
            if(filterConditions.type == 'hospital'){
              this.hospitalDetails.push(filterConditions);
              console.log(this.hospitalDetails);
            }
          }
        }
        //return this.hospitalDetails;
      })
    ).subscribe(getData => {
      //  console.log(getData);
    });


    this.http.get('https://healthservice-97887.firebaseio.com/doctors.json').pipe(
      map(responseData => {
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            this.doctorDetails.push({ ...responseData[key], id: key })
          }
        }
        return this.doctorDetails;
      })
    ).subscribe(getData => {
      //  console.log(getData);
    });
  }

  filterItems(searchTerm: string, searchFor, id?) {

    console.log(this.hospitalDetails);
    if (this.doctorDetails != undefined && this.hospitalDetails != undefined) {
      let doctorDetail;
      doctorDetail = this.doctorDetails.filter((value) => value.hospitalId == id);
      if (searchTerm == "" && searchFor == "doctor") {
        return doctorDetail;
      }
      else if (searchTerm == "" || searchTerm == undefined && searchFor == "hospital") {
        return this.hospitalDetails;
      }
      else if (searchTerm != "" && searchFor == "doctor") {
        return doctorDetail.filter(item => {
          return item.name.toLocaleLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        })
      }
      else if (searchTerm != "" || searchTerm != undefined && searchFor == "hospital") {
        console.log(searchTerm)
        console.log(this.hospitalDetails)
        return this.hospitalDetails.filter(item => {
          return item.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1 || item.address.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1 || item.specialize.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1
        })
      }
      else {
        console.log("Someting might wrong please reload the site.")
      }
    }
  }
}


  // hospitalDetails = [
  //   {
  //     id: 1,
  //     name: "Sm hospital",
  //     image: "https://cdn.pixabay.com/photo/2020/04/28/06/57/medicine-5103043__340.jpg",
  //     location: "Near national market,peeragarhi",
  //     specialize: "Cardiology,Epidemiologist,Endocrinologist,Allergist,Physiologist"
  //   },
  //   {
  //     id: 2,
  //     name: "Am hospital",
  //     image: "https://cdn.pixabay.com/photo/2020/05/25/03/37/doctor-5216835__340.png",
  //     location: "Nangoli,near metro station",
  //     specialize: "Neonatologist,Microbiologist,Medical Geneticist,Anesthesiologist"
  //   },
  //   {
  //     id: 3,
  //     name: "Km hospital",
  //     image: "https://cdn.pixabay.com/photo/2014/12/10/20/56/medical-563427__340.jpg",
  //     location: "Tilak nagar ,near metro station",
  //     specialize: "ENT Specialist,Paediatrician,Neurosurgeon,Neurologist"
  //   },
  //   {
  //     id: 4,
  //     name: "Lm hospital",
  //     image: "https://cdn.pixabay.com/photo/2016/04/01/09/51/boy-1299626__340.png",
  //     location: "Near national market,peeragarhi",
  //     specialize: "Epidemiologist,Anesthesiologist,Physiologist,Paediatrician,ENT Specialist"
  //   },
  //   {
  //     id: 5,
  //     name: "Mm hospital",
  //     image: "https://cdn.pixabay.com/photo/2016/09/30/23/47/hospital-1706646__340.png",
  //     location: "Near national market,peeragarhi",
  //     specialize: "Cardiology,Endocrinologist,Dentist,Audiologist,Allergist"
  //   },
  // ];


  // doctorDetails = [
  //   {
  //     hospitalId: 1,
  //     doctorId: 1,
  //     name: "Dr. Ankush",
  //     specialize: "Cardiology",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2020/05/25/03/37/doctor-5216835__340.png",
  //     email: "ankush@gmail.com",
  //     fees: 1000,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "4 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 1,
  //     doctorId: 2,
  //     name: "Dr. Aanchal",
  //     specialize: "Physiologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2020/04/15/17/32/medical-5047582__340.png",
  //     email: "aanchal@gmail.com",
  //     fees: 1500,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "5 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 1,
  //     doctorId: 3,
  //     name: "Dr. Naman",
  //     specialize: "Allergist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2020/05/25/03/37/doctor-5216835__340.png",
  //     email: "naman@gmail.com",
  //     fees: 1700,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "10 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 1,
  //     doctorId: 4,
  //     name: "Dr. Aman",
  //     specialize: "Epidemiologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2020/05/25/03/37/doctor-5216835__340.png",
  //     email: "aman@gmail.com",
  //     fees: 2000,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "20 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 1,
  //     doctorId: 5,
  //     name: "Dr. Akash",
  //     specialize: "Endocrinologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2020/05/25/03/37/doctor-5216835__340.png",
  //     email: "akash@gmail.com",
  //     fees: 2000,
  //     languagesSpoken: "English,Hindi,Tamil",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "20+ years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 2,
  //     doctorId: 6,
  //     name: "Dr. Ankush",
  //     specialize: "Epidemiologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/10/20/19/06/doctor-2872394__340.jpg",
  //     email: "ankush@gmail.com",
  //     fees: 1000,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "4 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 2,
  //     doctorId: 7,
  //     name: "Dr. Aanchal",
  //     specialize: "Anesthesiologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2020/04/15/17/32/medical-5047582__340.png",
  //     email: "aanchal@gmail.com",
  //     fees: 1500,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "5 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 2,
  //     doctorId: 8,
  //     name: "Dr. Naman",
  //     specialize: "Medical Geneticist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/10/20/19/06/doctor-2872394__340.jpg",
  //     email: "naman@gmail.com",
  //     fees: 1700,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "10 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 2,
  //     doctorId: 9,
  //     name: "Dr. Aman",
  //     specialize: "Microbiologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/10/20/19/06/doctor-2872394__340.jpg",
  //     email: "aman@gmail.com",
  //     fees: 2000,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "20 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 2,
  //     doctorId: 10,
  //     name: "Dr. Akash",
  //     specialize: "Neonatologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/10/20/19/06/doctor-2872394__340.jpg",
  //     email: "akash@gmail.com",
  //     fees: 2000,
  //     languagesSpoken: "English,Hindi,Tamil",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "20+ years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 3,
  //     doctorId: 11,
  //     name: "Dr. Ankush",
  //     specialize: "Neurologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/01/31/22/07/african-2027619__340.png",
  //     email: "ankush@gmail.com",
  //     fees: 1000,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "4 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 3,
  //     doctorId: 12,
  //     name: "Dr. Aanchal",
  //     specialize: "Neurologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2020/04/15/17/32/medical-5047582__340.png",
  //     email: "aanchal@gmail.com",
  //     fees: 1500,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "5 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 3,
  //     doctorId: 13,
  //     name: "Dr. Naman",
  //     specialize: "Neurosurgeon",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/01/31/22/07/african-2027619__340.png",
  //     email: "naman@gmail.com",
  //     fees: 1700,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "10 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 3,
  //     doctorId: 14,
  //     name: "Dr. Aman",
  //     specialize: "Paediatrician",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/01/31/22/07/african-2027619__340.png",
  //     email: "aman@gmail.com",
  //     fees: 2000,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "20 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 3,
  //     doctorId: 15,
  //     name: "Dr. Akash",
  //     specialize: "ENT Specialist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/01/31/22/07/african-2027619__340.png",
  //     email: "akash@gmail.com",
  //     fees: 2000,
  //     languagesSpoken: "English,Hindi,Tamil",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "20+ years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 4,
  //     doctorId: 16,
  //     name: "Dr. Ankush",
  //     specialize: "ENT Specialist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/09/14/11/36/doctor-2748707__340.png",
  //     email: "ankush@gmail.com",
  //     fees: 1000,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "4 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 4,
  //     doctorId: 17,
  //     name: "Dr. Aanchal",
  //     specialize: "Paediatrician",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2020/04/15/17/32/medical-5047582__340.png",
  //     email: "aanchal@gmail.com",
  //     fees: 1500,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "5 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 4,
  //     doctorId: 18,
  //     name: "Dr. Naman",
  //     specialize: "Physiologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/09/14/11/36/doctor-2748707__340.png",
  //     email: "naman@gmail.com",
  //     fees: 1700,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "10 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 4,
  //     doctorId: 19,
  //     name: "Dr. Aman",
  //     specialize: "Anesthesiologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/09/14/11/36/doctor-2748707__340.png",
  //     email: "aman@gmail.com",
  //     fees: 2000,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "20 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 4,
  //     doctorId: 20,
  //     name: "Dr. Akash",
  //     specialize: "Epidemiologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/09/14/11/36/doctor-2748707__340.png",
  //     email: "akash@gmail.com",
  //     fees: 2000,
  //     languagesSpoken: "English,Hindi,Tamil",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "20+ years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 5,
  //     doctorId: 21,
  //     name: "Dr. Ankush",
  //     specialize: "Allergist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/01/31/22/32/boy-2027768__340.png",
  //     email: "ankush@gmail.com",
  //     fees: 1000,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "4 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 5,
  //     doctorId: 22,
  //     name: "Dr. Aanchal",
  //     specialize: "Audiologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2020/04/15/17/32/medical-5047582__340.png",
  //     email: "aanchal@gmail.com",
  //     fees: 1500,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "5 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 5,
  //     doctorId: 23,
  //     name: "Dr. Naman",
  //     specialize: "Dentist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/01/31/22/32/boy-2027768__340.png",
  //     email: "naman@gmail.com",
  //     fees: 1700,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "10 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 5,
  //     doctorId: 24,
  //     name: "Dr. Aman",
  //     specialize: "Endocrinologist",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/01/31/22/32/boy-2027768__340.png",
  //     email: "aman@gmail.com",
  //     fees: 2000,
  //     languagesSpoken: "English,Hindi",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "20 years",
  //     facilities: "Free checkup"
  //   },
  //   {
  //     hospitalId: 5,
  //     doctorId: 25,
  //     name: "Dr. Akash",
  //     specialize: "Cardiology",
  //     phoneNumber: 7894561230,
  //     image: "https://cdn.pixabay.com/photo/2017/01/31/22/32/boy-2027768__340.png",
  //     email: "akash@gmail.com",
  //     fees: 2000,
  //     languagesSpoken: "English,Hindi,Tamil",
  //     timing: "10 am to 6pm, Emergency Care all hours",
  //     appointmentSlots: 50,
  //     experience: "20+ years",
  //     facilities: "Free checkup"
  //   }
  // ]

