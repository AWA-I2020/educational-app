import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentPageRoutingModule } from './student-routing.module';
import { StudentPage } from './student.page';
import { ProfileComponent } from '../shared/profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterClassComponent } from './modals/register-class/register-class.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    StudentPage,
    RegisterClassComponent
  ],
  exports: [
  ]
})
export class StudentPageModule { }
