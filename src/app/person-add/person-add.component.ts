import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Person} from "../shared/models/person.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  @Output() addperson = new EventEmitter<Person>(); /* сделали событие */
  addForm: FormGroup;
  disabled_form = false;
  constructor() { }

  ngOnInit() {
    this.addForm = new FormGroup( {
      firstname: new FormControl({value: '', disabled: this.disabled_form}, [Validators.required]),
      lastname: new FormControl({value: '', disabled: this.disabled_form}, [Validators.required]),
      phone: new FormControl({value: '', disabled: this.disabled_form}, [Validators.required])
    })
  }
  test(elm) {
    console.log(elm);
  }
  on_add_person() {
    let person = new Person (this.addForm.value.firstname, this.addForm.value.lastname, this.addForm.value.phone);
    this.addperson.emit(person);

  }
}
