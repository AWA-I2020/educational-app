import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./authentication/sign-in/sign-in.component";
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { NotificationsComponent } from './shared/notifications/notifications/notifications.component';

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
    path: "student/notifications",
    component: NotificationsComponent
  },
  {
    path: "sign-in",
    component: SignInComponent,
  },
  {
    path: "sign-up",
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
