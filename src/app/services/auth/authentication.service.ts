import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from "@angular/fire/firestore";
import { User } from "src/app/models/user";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private userCollection: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>("users");
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
}
