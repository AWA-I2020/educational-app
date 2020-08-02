import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ProfileComponent } from "./profile/profile.component";
import { CommonModule } from "@angular/common";
import { NotificationsComponent } from "./notifications/notifications/notifications.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ProfileComponent, NotificationsComponent],
  exports: [ProfileComponent, NotificationsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
