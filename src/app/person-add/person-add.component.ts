import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Person} from "../shared/models/person.model";

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  @Output() addperson = new EventEmitter<Person>(); /* сделали событие */

  constructor() { }

  ngOnInit() {
  }
  test(elm) {
    console.log(elm);
  }
  on_add_person(firstname: string = "Name", lastname: string = "Surname") {
    let person = new Person(firstname, lastname);
    this.addperson.emit(person);

  }
}
