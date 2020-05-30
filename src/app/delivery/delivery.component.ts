import {Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {take} from "rxjs/operators";
import {previousAction, saveWizardAction} from "../ngrx/app.actions";
import {IState} from "../ngrx/app.reducers";

@UntilDestroy()
@Component({
  selector:    'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls:   ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit
{

  deliveryForm: FormGroup;
  address1: FormControl = new FormControl("", [Validators.required]);
  address2: FormControl = new FormControl("", [Validators.required]);
  postCode: FormControl = new FormControl("", [Validators.required]);
  city: FormControl     = new FormControl("", [Validators.required]);
  state: FormControl    = new FormControl("", [Validators.required]);
  country: FormControl  = new FormControl("", [Validators.required]);

  constructor(protected _formBuilder: FormBuilder,
              protected _store: Store<IState>)
  {
  }

  ngOnInit(): void
  {
    this.deliveryForm = this._formBuilder.group(
      {
        address1:  this.address1,
        address2: this.address2,
        postCode: this.postCode,
        city: this.city,
        state:        this.state,
        country:  this.country,
      }
    );


    this._store.pipe(
      untilDestroyed(this)
    ).subscribe(
      state => this.deliveryForm.setValue(state.wizard.delivery)
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
    Object.values(this.deliveryForm.controls).forEach(control => control.markAsDirty());

    /**
     * If form is not valid, do nothing
     */
    if(!this.deliveryForm.valid)
      return;

    /**
     * Update the store
     */
    this._store.dispatch(saveWizardAction({delivery: this.deliveryForm.value}));
  }
}
