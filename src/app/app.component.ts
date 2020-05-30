import {Component} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Store} from "@ngrx/store";
import {IState} from "./ngrx/app.reducers";
import {ISection} from "./section";
import {Sections} from "./sections.enum";

@UntilDestroy()
@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.scss']
})
export class AppComponent
{

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

  constructor(protected _store:Store<IState>)
  {

  }

  ngOnInit()
  {
    this._store.pipe(
      untilDestroyed(this)
    ).subscribe(state => this._activeSection = state.step);
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

  isFilled(i:number)
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
}
