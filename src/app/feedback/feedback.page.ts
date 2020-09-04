import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredentialsService } from '../services/user-credentials.service';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {


  feedbackDetails = {
    userUid: this.userCredentials.userId,
    userName: this.userCredentials.userName,
    customName: "",
    emailId: "",
    subject: "",
    ratings: "",
    message: ""
  }

  constructor(private route: ActivatedRoute, private router: Router, public userCredentials: UserCredentialsService, private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {
  }

  feedbackForm(form: NgForm) {
    if (form.valid) {
      this.http.post('https://healthservice-97887.firebaseio.com/feedback.json', this.feedbackDetails).subscribe(data => {
        this.thanksMessage();
        this.router.navigate(['/home']);
      })
    }
    else {
      this.emptyField()
    }
  }

  async emptyField() {
    const toast = await this.toastController.create({
      message: 'Your need to fill required details.',
      duration: 2000,
      position: "middle",
      color: "danger"
    });
    toast.present();
  }

  async thanksMessage() {
    const toast = await this.toastController.create({
      message: 'Thanks for feedback :)',
      duration: 2000,
      position: "middle",
      color: "primary"
    });
    toast.present();
  }

}

