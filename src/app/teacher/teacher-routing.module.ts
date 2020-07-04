import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TeacherPage } from "./teacher.page";
import { ClassComponent } from "../shared/class/class.component";

const routes: Routes = [
  {
    path: "",
    component: TeacherPage,
  },
  { path: "class/:id", component: ClassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherPageRoutingModule {}
