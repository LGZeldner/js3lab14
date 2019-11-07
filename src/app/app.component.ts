import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from "./shared/models/person.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Компоненты';
  persons: Person[] = [];
  constructor() { /* в конструкторе не очень хорошо проводить инициализации */
    console.log("Constructor");
  }

  ngOnInit(): void { /* лучше инициализировать здесь */
    // console.log("init");
    this.persons.push(new Person("First", "Firstsmth", "+4", 1));
    this.persons.push(new Person("First", "Firstsmth", "+5", 2));
    this.persons.push(new Person("First", "Firstsmth", "+8", 3));
    this.persons.push(new Person("First", "Firstsmth", "+9", 4));
  }

  ngOnDestroy(): void {
  }
  on_add_person (person: Person) {
    person.id = (this.persons.length)
                  ? this.persons[this.persons.length - 1].id + 1
                  : 1;
    this.persons.push(person);
  }
  on_edit_person (ed_person: Person) {
    Object.assign (this.persons.find((element, index, array) => {
      return (element.id === ed_person.id)
    }), ed_person);
  }
  on_del_person (del_person_id: number) {
    this.persons.splice(this.persons.indexOf(this.persons.find((element, index, array) => {
      return (element.id === del_person_id)
    })), 1); /* удалили из массива элемент */
  }
}
