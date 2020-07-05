import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

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
  ],
};

@NgModule({
  exports: [SignInComponent, SignUpComponent, ClassComponent],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ClassComponent,
    ResourceComponent,
  ],
  entryComponents: [ResourceComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    FormsModule,
    ReactiveFormsModule,
    TeacherPageModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
