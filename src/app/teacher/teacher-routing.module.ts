import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TeacherPage } from "./teacher.page";
import { ClassComponent } from "../shared/class/class.component";
import { ProfileComponent } from '../shared/profile/profile.component';

const routes: Routes = [
  {
    path: "",
    component: TeacherPage,
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "class/:id",
    component: ClassComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherPageRoutingModule { }
