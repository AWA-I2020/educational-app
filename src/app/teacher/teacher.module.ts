import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, ModalController } from '@ionic/angular';

import { TeacherPageRoutingModule } from './teacher-routing.module';

import { TeacherPage } from './teacher.page';
import { ModalAddClassComponent } from './modals/modal-add-class/modal-add-class.component';
import { ProfileComponent } from '../shared/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TeacherPage,ModalAddClassComponent,ProfileComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TeacherPageModule { }
