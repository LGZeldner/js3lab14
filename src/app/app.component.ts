import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from "./shared/models/person.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Компоненты';
  firstname_filter: boolean;
  search_firstname = "";
  search_lastname = "";
  lastname_filter: boolean;
  persons: Person[] = [];
  constructor() { /* в конструкторе не очень хорошо проводить инициализации */
    console.log("Constructor");
  }

  ngOnInit(): void { /* лучше инициализировать здесь */
    // console.log("init");
    this.persons.push(new Person("First", "Firstsmth", "+4", 1));
    this.persons.push(new Person("Second", "Secondsmth", "+5", 2));
    this.persons.push(new Person("Third", "Thirdsmth", "+8", 3));
    this.persons.push(new Person("Fourth", "Fourthsmth", "+9", 4));
  }

  ngOnDestroy(): void {
  }
  toggle_lastname_filter() {
    this.lastname_filter = !this.lastname_filter;
    this.search_lastname = "";
  }
  toggle_firstname_filter() {
    this.firstname_filter = !this.firstname_filter;
    this.search_firstname = "";
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
