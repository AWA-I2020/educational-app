import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./authentication/sign-in/sign-in.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "sign-in",
    pathMatch: "full",
  },
  {
    path: "teacher",
    loadChildren: () =>
      import("./teacher/teacher.module").then((m) => m.TeacherPageModule),
  },
  {
    path: "student",
    loadChildren: () =>
      import("./student/student.module").then((m) => m.StudentPageModule),
  },
  {
    path: "parent",
    loadChildren: () =>
      import("./parent/parent.module").then((m) => m.ParentPageModule),
  },
  {
    path: "sign-in",
    component: SignInComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
