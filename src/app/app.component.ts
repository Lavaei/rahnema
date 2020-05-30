import {Component} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Store} from "@ngrx/store";
import {startEditingAction} from "./ngrx/app.actions";
import {IState} from "./ngrx/app.reducers";
import {ISection} from "./section";
import {Sections} from "./sections.enum";
import {IWizard} from "./wizard";
import {WizardService} from "./wizard.service";

@UntilDestroy()
@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent
{

  /**
   * List of sections (steps) in the wizard
   */
  sections: ISection[] = [
    {
      _id:   Sections.PROJECT,
      icon:  "fas fa-list-alt",
      label: "Project Details"
    },
    {
      _id:   Sections.SETTINGS,
      icon:  "fas fa-cogs",
      label: "Project Settings"
    },
    {
      _id:   Sections.DELIVERY,
      icon:  "fas fa-list-alt",
      label: "Delivery Details"
    },
    {
      _id:   Sections.REVIEW,
      icon:  "fas fa-list-alt",
      label: "Review and Submit"
    },
  ];

  protected _activeSection: Sections = Sections.PROJECT;

  get wizards(): IWizard[]
  {
    return this._wizardService.wizards;
  }


  constructor(protected _store: Store<IState>,
              protected _wizardService: WizardService)
  {

  }

  ngOnInit()
  {
    this._store.pipe(
      untilDestroyed(this)
    ).subscribe(state => this._activeSection = state.step);

    this._wizardService.getAll().subscribe(wizards => this._wizardService.wizards = wizards);
  }

  /**
   * Determinate if project section is selected or not
   * @return {boolean}
   */
  isProject(): boolean
  {
    return this._activeSection === Sections.PROJECT;
  }

  /**
   * Determinate if settings section is selected or not
   * @return {boolean}
   */
  isSettings(): boolean
  {
    return this._activeSection === Sections.SETTINGS;
  }

  /**
   * Determinate if delivery section is selected or not
   * @return {boolean}
   */
  isDelivery(): boolean
  {
    return this._activeSection === Sections.DELIVERY;
  }

  /**
   * Determinate if review section is selected or not
   * @return {boolean}
   */
  isReview(): boolean
  {
    return this._activeSection === Sections.REVIEW;
  }

  /**
   * Determinate if section is filled by user or not
   * @param {number} i
   * @return {boolean}
   */
  isFilled(i: number)
  {
    return this._activeSection >= i;
  }

  /**
   * Get title of active section
   */
  getTitle(): string
  {
    /**
     * Get section index
     */
    const INDEX: number = this.sections.findIndex(section => section._id === this._activeSection);

    /**
     * If index not found, exit from function
     */
    if (INDEX === -1)
    {
      return;
    }

    return this.sections[INDEX].label;
  }

  /**
   * Remove a record by given ID
   * @param {string} itemID
   */
  removeWizard(itemID: string)
  {
    this._wizardService.removeByID(itemID).subscribe(wizards => this._wizardService.wizards = wizards);
  }

  /**
   * Prepare wizard for edit given record
   * @param {IWizard} wizard
   */
  startEditing(wizard:IWizard)
  {
    this._store.dispatch(startEditingAction(wizard));
  }
}
