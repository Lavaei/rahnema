import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs";
import {exhaustMap, map, mergeMap, tap} from "rxjs/operators";
import {WizardService} from "../wizard.service";
import {nextAction, resetAction, saveWizardAction, startEditingAction, submitAction} from "./app.actions";

@Injectable(
  {
    providedIn: "root"
  }
)
export class AppEffects
{

  constructor(protected _actions: Actions,
              protected _wizardService:WizardService)
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
    exhaustMap(wizard => {
      if(wizard._id)
      {
        return this._wizardService.edit(wizard);
      }
      else
      {
        return this._wizardService.create(wizard);
      }
    }),
    tap(wizards => this._wizardService.wizards = wizards),
    map(() => resetAction()),
  );
}
