import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from "../shared/models/person.model";

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {
  @Input() inPerson: Person; /* получаем доступ сверху */
  @Output() delPerson = new EventEmitter<number>(); /* отправляем наверх */
  @Output() editPerson = new EventEmitter<Person>();
  edit_flag: boolean; /* включен или выключен режим редактирования */
  constructor() { }

  ngOnInit() {
    // console.log(this.inPerson);
    this.edit_flag = false;
  }

  on_del_person () {
    this.delPerson.emit(this.inPerson.id);
  }
  on_edit_person (firstname: string = this.inPerson.firstname, lastname: string = this.inPerson.lastname) {
    let ed_person = new Person(firstname, lastname, this.inPerson.id);
    this.editPerson.emit(ed_person);
    this.toggle_edit();
  }
  toggle_edit () {
    this.edit_flag = !this.edit_flag;
  }
}
