import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ProfileComponent } from "./profile/profile.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
