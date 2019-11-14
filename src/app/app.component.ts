import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from "./shared/models/person.model";
import {PersonsService} from "./shared/services/persons.service";
import {isNullOrUndefined} from "util";

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
  persons: /*Person[] = []*/any;
  constructor(private personsServise: PersonsService) { /* в конструкторе не очень хорошо проводить инициализации */
    console.log("Constructor");
  }

  async ngOnInit() { /* лучше инициализировать здесь */
    // console.log("init");
    try {
      let gpersons = this.personsServise.getPersons();
      this.persons = (isNullOrUndefined(await gpersons)) ? [] : await gpersons;
      console.log(this.persons);
    } catch (err) {
      console.log(err);
    }

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
  async on_edit_person (ed_person: Person) {
    Object.assign (this.persons.find((element, index, array) => {
      return (element.id === ed_person.id)
    }), ed_person);
    try {
      await this.personsServise.putPersons(ed_person.id, {
        firstname: ed_person.firstname, lastname: ed_person.lastname, phone: ed_person.phone});
    }
    catch (e) {
      console.error(e);
    }
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
