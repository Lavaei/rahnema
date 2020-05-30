import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {take} from "rxjs/operators";
import {Communications} from "../communications.enum";
import {previousAction, saveWizardAction} from "../ngrx/app.actions";
import {IState} from "../ngrx/app.reducers";

@Component({
  selector:    'app-settings',
  templateUrl: './settings.component.html',
  styleUrls:   ['./settings.component.scss']
})
export class SettingsComponent implements OnInit
{

  readonly communicationItems: {_id:string, label:string}[] = [
    {
      _id: Communications.EMAIL,
      label: "Email",
    },
    {
      _id: Communications.SMS,
      label: "SMS",
    },
    {
      _id: Communications.PHONE,
      label: "Phone",
    },
  ];

  settingsForm: FormGroup;
  email: FormControl         = new FormControl("", [Validators.required, Validators.email]);
  language: FormControl      = new FormControl("", [Validators.required]);
  timeZone: FormControl      = new FormControl("", [Validators.required]);
  communication: FormControl = new FormControl("", [Validators.required]);

  constructor(protected _formBuilder: FormBuilder,
              protected _store: Store<IState>)
  {
  }

  ngOnInit(): void
  {
    this.settingsForm = this._formBuilder.group(
      {
        email:         this.email,
        language:      this.language,
        timeZone:      this.timeZone,
        communication: this.communication,
      }
    );

    this._store.pipe(
      take(1)
    ).subscribe(
      state => this.settingsForm.setValue(state.wizard.settings)
    );
  }

  previous()
  {
    this._store.dispatch(previousAction());
  }

  next()
  {
    /**
     * Mark all inputs as dirty
     */
    Object.values(this.settingsForm.controls).forEach(control => control.markAsDirty());

    /**
     * If form is not valid, do nothing
     */
    if(!this.settingsForm.valid)
      return;

    /**
     * Update the store
     */
    this._store.dispatch(saveWizardAction({settings: this.settingsForm.value}));
  }

}
