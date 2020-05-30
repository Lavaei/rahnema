import {createAction, props} from "@ngrx/store";
import {IWizard} from "../wizard";

export const saveWizardAction = createAction('[Save Wizard] Save', props<Partial<IWizard>>());

export const nextAction = createAction('[Next Step] Next');

export const previousAction = createAction('[Previous Step] Previous');

export const submitAction = createAction('[Submit Wizard] Submit', props<IWizard>());

export const startEditingAction = createAction('[Edit Wizard] Edit', props<IWizard>());

export const resetAction = createAction('[Reset Wizard] Reset');
