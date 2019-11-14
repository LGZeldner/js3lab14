import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from "./shared/models/person.model";
import {PersonsService} from "./shared/services/persons.service";

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
  constructor(private personsServise: PersonsService) { /* в конструкторе не очень хорошо проводить инициализации */
    console.log("Constructor");
  }

  ngOnInit(): void { /* лучше инициализировать здесь */
    // console.log("init");
    this.persons.push(new Person("First", "Firstsmth", "+7(900) 111-1111", 1));
    this.persons.push(new Person("Second", "Secondsmth", "+7(900) 111-1112", 2));
    this.persons.push(new Person("Third", "Thirdsmth", "+7(900) 111-1113", 3));
    this.persons.push(new Person("Fourth", "Fourthsmth", "+7(900) 111-1114", 4));
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
  async on_add_person (person: Person) {
    person.id = (this.persons.length)
                  ? this.persons[this.persons.length - 1].id + 1
                  : 1;
    this.persons.push(person);
    try {
      await this.personsServise.postPersons({
        firstname: person.firstname, lastname: person.lastname, phone: person.phone});
    }
    catch (e) {
      console.error(e);
    }
  }
  on_edit_person (ed_person: Person) {
    Object.assign (this.persons.find((element, index, array) => {
      return (element.id === ed_person.id)
    }), ed_person);
  }
  async on_del_person (del_person_id: number) {
    this.persons.splice(this.persons.indexOf(this.persons.find((element, index, array) => {
      return (element.id === del_person_id)
    })), 1); /* удалили из массива элемент */
    try {
      await this.personsServise.deletePersons(del_person_id);
    }
    catch (e) {
      console.error(e);
    }
  }

}
