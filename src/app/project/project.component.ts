import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {take} from "rxjs/operators";
import {previousAction, saveWizardAction} from "../ngrx/app.actions";
import {IState} from "../ngrx/app.reducers";

@Component({
  selector:    'app-project',
  templateUrl: './project.component.html',
  styleUrls:   ['./project.component.scss']
})
export class ProjectComponent implements OnInit
{

  projectForm: FormGroup;
  projectName: FormControl  = new FormControl("", [Validators.required]);
  projectOwner: FormControl = new FormControl("", [Validators.required]);
  customerName: FormControl = new FormControl("", [Validators.required]);
  contactPhone: FormControl = new FormControl("", [Validators.required]);
  email: FormControl        = new FormControl("", [Validators.required, Validators.email]);
  companySite: FormControl  = new FormControl("", [Validators.required]);

  constructor(protected _formBuilder: FormBuilder,
              protected _store: Store<IState>)
  {
  }

  ngOnInit(): void
  {
    this.projectForm = this._formBuilder.group(
      {
        projectName:  this.projectName,
        projectOwner: this.projectOwner,
        customerName: this.customerName,
        contactPhone: this.contactPhone,
        email:        this.email,
        companySite:  this.companySite,
      }
    );


    this._store.pipe(
      take(1)
    ).subscribe(
      state => this.projectForm.setValue(state.wizard.project)
    );
  }

  /**
   * Save form and go to the next sextion
   */
  next()
  {
    /**
     * Mark all inputs as dirty
     */
    Object.values(this.projectForm.controls).forEach(control => control.markAsDirty());

    /**
     * If form is not valid, do nothing
     */
    if(!this.projectForm.valid)
      return;

    /**
     * Update the store
     */
    this._store.dispatch(saveWizardAction({project: this.projectForm.value}));
  }
}
