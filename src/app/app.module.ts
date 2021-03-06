import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { registerLocaleData, AsyncPipe } from "@angular/common";
import localeEs from "@angular/common/locales/es";
import { AngularFireMessagingModule } from "@angular/fire/messaging";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { SignInComponent } from "./authentication/sign-in/sign-in.component";
import { SignUpComponent } from "./authentication/sign-up/sign-up.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxIndexedDBModule, DBConfig } from "ngx-indexed-db";
import { ClassComponent } from "./shared/class/class.component";
import { TeacherPageModule } from "./teacher/teacher.module";
import { ResourceComponent } from "./shared/resource/resource.component";
import { ResourceViewComponent } from "./shared/resource-view/resource-view.component";
import { HttpClientModule } from "@angular/common/http";
import { ShareOptionsComponent } from "./shared/share-options/share-options.component";
import { ActivityViewComponent } from "./shared/activity-view/activity-view.component";
import { ActivitiesViewComponent } from "./shared/activities-view/activities-view.component";
import { MessagingService } from "./services/messaging/messaging.service";
import { StudentPageModule } from './student/student.module';
import { ProfileComponent } from './shared/profile/profile.component';
import { SharedModule } from './shared/shared.module';

const dbConfig: DBConfig = {
  name: "EducationalDb",
  version: 1,
  objectStoresMeta: [
    {
      store: "user",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        {
          name: "completeName",
          keypath: "completeName",
          options: { unique: false },
        },
        {
          name: "completeNameNormalizad",
          keypath: "completeNameNormalizad",
          options: { unique: false },
        },
        { name: "role", keypath: "role", options: { unique: false } },
        { name: "id", keypath: "id", options: { unique: false } },
      ],
    },
    {
      storeConfig: { keyPath: "id", autoIncrement: true },
      store: "resources",
      storeSchema: [
        { name: "files", keypath: "files", options: { unique: false } },
      ],
    },
    {
      storeConfig: { keyPath: "id", autoIncrement: true },
      store: "activities",
      storeSchema: [
        {
          name: "activities",
          keypath: "activities",
          options: { unique: false },
        },
      ],
    },
    {
      storeConfig: { keyPath: "id", autoIncrement: true },
      store: "notifications",
      storeSchema: [
        {
          name: "notification",
          keypath: "notification",
          options: { unique: false },
        },
      ],
    },
  ],
};
registerLocaleData(localeEs, "es");

@NgModule({
  exports: [
    SignInComponent,
    SignUpComponent,
    ClassComponent,
  ],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ClassComponent,
    ResourceComponent,
    ResourceViewComponent,
    ActivityViewComponent,
    ActivitiesViewComponent,
    ShareOptionsComponent,
  ],
  entryComponents: [
    ResourceComponent,
    ResourceViewComponent,
    ActivityViewComponent,
    ActivitiesViewComponent,
    ShareOptionsComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireMessagingModule,
    HttpClientModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    FormsModule,
    ReactiveFormsModule,
    TeacherPageModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    StudentPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: "es" },
    MessagingService,
    AsyncPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
