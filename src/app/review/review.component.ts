import {Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Store} from "@ngrx/store";
import {take} from "rxjs/operators";
import {previousAction, saveWizardAction, submitAction} from "../ngrx/app.actions";
import {IState} from "../ngrx/app.reducers";
import {IWizard} from "../wizard";

@UntilDestroy()
@Component({
  selector:    'app-review',
  templateUrl: './review.component.html',
  styleUrls:   ['./review.component.scss']
})
export class ReviewComponent implements OnInit
{

  wizard: IWizard;

  constructor(protected _store: Store<IState>)
  {
  }

  ngOnInit(): void
  {
    this._store.pipe(
      untilDestroyed(this)
    ).subscribe(
      state => this.wizard = state.wizard
    );
  }

  previous()
  {
    this._store.dispatch(previousAction());
  }

  submit()
  {
    this._store.dispatch(submitAction(this.wizard));
  }
}
