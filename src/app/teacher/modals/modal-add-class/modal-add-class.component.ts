import { Component } from '@angular/core';
import { Modal } from '../modal';

@Component({
  selector: 'app-modal-add-class',
  templateUrl: './modal-add-class.component.html',
  styleUrls: ['./modal-add-class.component.scss'],
})
export class ModalAddClassComponent extends Modal {

  materias = ['Matematicas', 'Lenguaje', 'Historia'];
  cursos = [];
  paralelos = [];

  constructor() {
    super();
  }

  ngOnInit() {
    // add services
    this.materias = ['Matematicas', 'Lenguaje', 'Historia'];
    this.cursos = [1, 2, 3, 4, 5, 6];
    this.paralelos = ['A', 'B', 'C', 'D'];
  }

}
