import {Action, createReducer, on} from "@ngrx/store";
import {Sections} from "../sections.enum";
import {nextAction, previousAction, resetAction, saveWizardAction, startEditingAction, submitAction} from "./app.actions";
import {IWizard} from "../wizard";

const INITIAL_WIZARD_STATE: IWizard = {
  project: {
    projectName:  '',
    projectOwner: '',
    customerName: '',
    contactPhone: '',
    email:        '',
    companySite:  '',
  },

  settings: {
    email:         '',
    language:      'English',
    timeZone:      "+3:30",
    communication: []
  },

  delivery: {
    address1: '',
    address2: '',
    postCode: 0,
    city:     '',
    state:    '',
    country:  ''
  },

}

export function wizardReducer(state: IWizard | undefined, action: Action)
{
  return createReducer(
    INITIAL_WIZARD_STATE,
    on(saveWizardAction, (state, props) => ({...state, ...props})),
    on(startEditingAction, (state, props) => ({...INITIAL_WIZARD_STATE, ...props})),
    on(resetAction, () => INITIAL_WIZARD_STATE),
  )(state, action);
}

export function stepReducer(state: Sections | undefined, action: Action)
{
  return createReducer(
    Sections.PROJECT,
    on(nextAction, (state) => state + 1),
    on(previousAction, (state) => state - 1),
    on(submitAction, () => Sections.PROJECT),
    on(resetAction, () => Sections.PROJECT),
  )(state, action);
}

export interface IState
{
  wizard: IWizard;
  step: Sections;
}
