import { Pipe, PipeTransform } from '@angular/core';
import {Person} from "../models/person.model";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'appLastnameFilter'
})
export class AppLastnameFilterPipe implements PipeTransform {

  transform(persons: Person[], search: string) {
    if (!isNullOrUndefined(persons) && search.trim() !== "") {
      console.log(search);
      let filter_persons = persons.filter(
        person => person.lastname.toLowerCase().indexOf(search.toLowerCase()) === 0
      );
      return filter_persons;
    }
    return persons;
  }
}
