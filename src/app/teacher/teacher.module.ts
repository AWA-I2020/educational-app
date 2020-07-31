import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, ModalController } from '@ionic/angular';

import { TeacherPageRoutingModule } from './teacher-routing.module';

import { TeacherPage } from './teacher.page';
import { ModalAddClassComponent } from './modals/modal-add-class/modal-add-class.component';
import { ModalAddActivityHomeComponent } from './modals/modal-add-activity-home/modal-add-activity-home.component';
import { ModalAddActivityQuestionComponent } from './modals/modal-add-activity-question/modal-add-activity-question.component';
import { ProfileComponent } from '../shared/profile/profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    TeacherPage,
    ModalAddClassComponent,
    ModalAddActivityHomeComponent,
    ModalAddActivityQuestionComponent,
  ],
//  exports:[ProfileComponent]
})
export class TeacherPageModule { }
