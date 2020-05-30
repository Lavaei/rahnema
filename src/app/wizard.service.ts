import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IWizard} from "./wizard";

@Injectable({
  providedIn: 'root'
})
export class WizardService
{

  wizards:IWizard[] = [];

  constructor(protected _http: HttpClient)
  {
  }

  getAll():Observable<IWizard[]>
  {
    return this._http.get<IWizard[]>('api/wizard');
  }

  getByID(itemID:string):Observable<IWizard>
  {
    return this._http.get<IWizard>(`api/wizard/${itemID}`);
  }

  removeByID(itemID:string): Observable<IWizard[]>
  {
    return this._http.delete<IWizard[]>(`api/wizard/${itemID}`);
  }

  create(wizard: IWizard): Observable<IWizard[]>
  {
    return this._http.post<IWizard[]>('api/wizard', {wizard});
  }

  edit(wizard: IWizard): Observable<IWizard[]>
  {
    return this._http.patch<IWizard[]>(`api/wizard/${wizard._id}`, {wizard});
  }
}
