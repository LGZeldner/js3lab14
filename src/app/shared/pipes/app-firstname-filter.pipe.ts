import { Pipe, PipeTransform } from '@angular/core';
import {Person} from "../models/person.model";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'appFirstnameFilter'
})
export class AppFirstnameFilterPipe implements PipeTransform {

  transform(persons: Person[], search: string) {
    if (!isNullOrUndefined(persons) && search.trim() !== "") {
      console.log(search);
      let filter_persons = persons.filter(
        person => person.firstname.toLowerCase().indexOf(search.toLowerCase()) === 0
      );
      return  filter_persons;
    }
    return persons;
  }

}
