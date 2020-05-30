import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {nextAction, resetAction, saveWizardAction, submitAction} from "./app.actions";

@Injectable(
  {
    providedIn: "root"
  }
)
export class AppEffects
{

  constructor(protected _actions: Actions)
  {
  }

  @Effect()
  saveWizard: Observable<Action> = this._actions.pipe(
    ofType(saveWizardAction),
    map(() => nextAction()),
  );

  @Effect()
  submitWizard: Observable<Action> = this._actions.pipe(
    ofType(submitAction),
    map(() => resetAction()),
  );
}
