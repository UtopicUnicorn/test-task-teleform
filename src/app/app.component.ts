import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MapComponent} from "./map/map.component";
import {pipe} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  registrationForm!: FormGroup;
  address = '';
  title = 'test-task-teleform';

  get formArray(): AbstractControl | null { return this.registrationForm.get('formArray'); }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
  }

  ngOnInit(): void{
    this.createForm();
  }


  createForm(): void{
    this.registrationForm = this.fb.group({
      formArray: this.fb.array([
      this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
    }),
      this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('',[Validators.required, Validators.pattern('^([+][0-9])|([0-9])([0-9]{10})')]),
      address: new FormControl('', [Validators.required]),
      date: new FormControl('', Validators.required),
    }),
      this.fb.group({
      agree: new FormControl(false, Validators.requiredTrue),
      mailing: new FormControl(false, Validators.nullValidator),
    })
      ])

    })
  }




  openMap(){
    let dialog = this.dialog.open(MapComponent);
    dialog.afterClosed().subscribe(pipe((result: string)=>this.address = result, ()=>this.registrationForm.get('formArray.1.address')?.patchValue(this.address)));
  }

  sendForm():void{
    console.log(this.registrationForm.value);
  }


}
