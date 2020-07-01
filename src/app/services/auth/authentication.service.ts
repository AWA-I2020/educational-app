import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { User } from "src/app/models/user";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Platform } from "@ionic/angular";
import { Plugins } from "@capacitor/core";
import { Router } from "@angular/router";
const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  user: User;
  private userCollection: AngularFirestoreCollection<User>;
  constructor(
    private afs: AngularFirestore,
    public platform: Platform,
    private router: Router
  ) {
    this.userCollection = this.afs.collection<User>("users");
    if (this.platform.is("desktop")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.user = (this.getUserData() as unknown) as User;
    }
    if (this.user) {
      if (this.user.role === "Profesor") {
        this.router.navigate(["teacher"]);
      } else {
        if (this.user.role === "Estudiante") {
          this.router.navigate(["teacher"]);
        } else {
          if (this.user.role === "Padre de Familia") {
            this.router.navigate(["parent"]);
          }
        }
      }
    }
  }

  async signOut() {
    if (this.platform.is("desktop")) {
      localStorage.removeItem("user");
      this.router.navigate(["sign-in"]);
    } else {
      await Storage.remove({ key: "user" });
      this.router.navigate(["sign-in"]);
    }
  }

  async getUserData() {
    const ret = await Storage.get({ key: "user" });
    let data = JSON.parse(ret.value);
    let user: User = {
      completeName: data.completeName,
      role: data.role,
      id: data.id,
      completeNameNormalizad: data.completeNameNormalizad,
    };
    return user;
  }

  searchUser(completeName: string): Observable<User[]> {
    return this.afs
      .collection<User>("users", (ref) =>
        ref.where("completeNameNormalizad", "==", completeName)
      )
      .valueChanges()
      .pipe(
        take(1),
        map((collection) => {
          return collection;
        })
      );
  }

  registerUser(user: User): Promise<DocumentReference> {
    return this.userCollection.add(user);
  }

  getUser(uid: string): Observable<User> {
    let userDoc = this.afs.doc<User>(`users/${uid}`);
    return userDoc.valueChanges().pipe(
      take(1),
      map((collection) => {
        return collection;
      })
    );
  }

  updateUser(data: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${data.id}`
    );
    return userRef.set(data, {
      merge: true,
    });
  }
}
