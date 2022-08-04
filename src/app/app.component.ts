import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  static phone_mask = ['(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  registationForm!: FormGroup;
  title = 'test-task-teleform';
  step = 1;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void{
    this.createForm();
  }

  createForm(): void{
    this.registationForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('',[Validators.required, Validators.pattern('^[+][0-9]([0-9]{10})')]),
      date: new FormControl('', Validators.required),
      agree: new FormControl(null, Validators.required),
      mailing: new FormControl(null, Validators.nullValidator),
    })
  }


  nextStep(): void{
    if(this.step+1>3){
      this.step =3;
      return;
    }
    this.step++;
  }

  previousStep(): void{
    if(this.step-1<1){
      this.step = 1;
      return
    }
    this.step--;
  }

  sendForm():void{
    console.log(this.registationForm.value);
  }


}
