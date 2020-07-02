import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalAddResourceComponent } from './modals/modal-add-resource/modal-add-resource.component';
import { ModalAddClassComponent } from './modals/modal-add-class/modal-add-class.component';
import { ModalAddActivityHomeComponent } from './modals/modal-add-activity-home/modal-add-activity-home.component';
import { ModalAddActivityQuestionComponent } from './modals/modal-add-activity-question/modal-add-activity-question.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})
export class TeacherPage implements OnInit {

  page = 1;
  pageTitle = 'Mis clases';
  especificClass = {
    title: '',
    content: '',
    paralelo: '',
  };
  backPage = 1;
  backTitle = this.pageTitle;

  // modals
  modalClass; modalResource; modalHome; modalQuestion;

  constructor(private menu: MenuController, public modalController: ModalController) {
    this.modalClass = ModalAddClassComponent;
    this.modalResource = ModalAddResourceComponent;
    this.modalHome = ModalAddActivityHomeComponent;
    this.modalQuestion = ModalAddActivityQuestionComponent;
  }

  ngOnInit() {
  }

  async openModal(modalComponent) {

    const modal = await this.modalController.create({
      component: modalComponent,
      componentProps: {
        'modalCtrl': this.modalController,
      }
    });
    return await modal.present();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  private changePage(valuePage, pageName, especificclass?) {
    this.backPage = this.page;
    this.backTitle = this.pageTitle;
    this.page = valuePage;
    this.pageTitle = pageName;
    this.especificClass = especificclass;
    this.menu.close();
  }

  private back() {
    this.page = this.backPage;
    this.pageTitle = this.backTitle;
  }

  private currentClass() {
    var selfClass = [
      {
        title: "Test 1",
        content: "Content 1",
        paralelo: 'A',
      },
      {
        title: "Test 1",
        content: "Content 1",
        paralelo: 'A',
      },
      {
        title: "Test 1",
        content: "Content 1",
        paralelo: 'A',
      },
      {
        title: "Test 1",
        content: "Content 1",
        paralelo: 'A',
      },
      {
        title: "Test 1",
        content: "Content 1",
        paralelo: 'A',
      },
      {
        title: "Test 1",
        content: "Content 1",
        paralelo: 'A',
      },
      {
        title: "Test 1",
        content: "Content 1",
        paralelo: 'A',
      },
      {
        title: "Test 1",
        content: "Content 1",
        paralelo: 'A',
      },
      {
        title: "Test 1",
        content: "Content 1",
        paralelo: 'A',
      },
    ]
    return selfClass;
  }
}
