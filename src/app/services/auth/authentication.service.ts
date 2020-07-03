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
import { NgxIndexedDBService } from "ngx-indexed-db";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  user: User;
  private userCollection: AngularFirestoreCollection<User>;
  constructor(
    private afs: AngularFirestore,
    private dbService: NgxIndexedDBService,
    private router: Router
  ) {
    this.userCollection = this.afs.collection<User>("users");
    this.dbService.getAll("user").then(
      (users) => {
        if (users.length > 0) {
          this.user = (users[0] as unknown) as User;
          if (this.user.role === "Profesor") {
            this.router.navigate(["teacher"]);
          } else {
            if (this.user.role === "Estudiante") {
              this.router.navigate(["student"]);
            } else {
              if (this.user.role === "Padre de Familia") {
                this.router.navigate(["parent"]);
              }
            }
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async signOut() {
    this.dbService.clear("user").then(
      () => {
        this.router.navigate(["sign-in"]);
      },
      (error) => {
        console.log(error);
      }
    );
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
