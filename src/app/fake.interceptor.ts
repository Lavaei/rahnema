import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, dematerialize, materialize} from "rxjs/operators";
import {IWizard} from "./wizard";

@Injectable()
export class FakeInterceptor implements HttpInterceptor
{

  constructor()
  {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
  {

    const {url, method} = request;

    let fakeRequest: Observable<HttpEvent<any>>;

    if (url.endsWith("api/wizard") && method.toUpperCase() === "GET") //Get All
    {
      fakeRequest = this._getFakeResponse(this._getWizardItems());
    }
    else if (url.endsWith("api/wizard") && method.toUpperCase() === "POST") //Create
    {
      this._addWizardItem((<any>request.body).wizard);

      fakeRequest = this._getFakeResponse(this._getWizardItems());
    }
    else if (/api\/wizard\/([^\/]+)$/.test(url) && method.toUpperCase() === "GET") //Get by ID
    {
      const ITEM_ID: string = /api\/wizard\/([^\/]+)$/.exec(url)[1];
      const ITEM            = this._getWizardItemByID(ITEM_ID);

      fakeRequest = ITEM ? this._getFakeResponse(ITEM) : this._getFakeResponse([], 404);
    }
    else if (/api\/wizard\/[^\/]+$/.test(url) && method.toUpperCase() === "PATCH") //Update by ID
    {
      this.editWizardItem((<any>request.body).wizard);

      fakeRequest = this._getFakeResponse(this._getWizardItems());
    }
    else if (/api\/wizard\/[^\/]+$/.test(url) && method.toUpperCase() === "DELETE") //Delete by ID
    {
      const ITEM_ID: string = /api\/wizard\/([^\/]+)$/.exec(url)[1];

      this._removeWizardItem(ITEM_ID);

      fakeRequest = this._getFakeResponse(this._getWizardItems());
    }
    else
    {
      fakeRequest = next.handle(request);
    }

    return fakeRequest.pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    return next.handle(request);
  }

  protected _getFakeResponse(body: string | { [key: string]: any }, status: number = 200)
  {
    return of(new HttpResponse({status, body}));
  }

  protected _getWizardItems(): IWizard[]
  {
    const DATA: string = localStorage.getItem('wizard');

    return DATA ? JSON.parse(DATA) : [];
  }

  protected _getWizardItemByID(itemID: string)
  {
    const ITEMS: IWizard[] = this._getWizardItems();

    return ITEMS.find(item => item._id === itemID);
  }

  protected _addWizardItem(item)
  {
    const ITEMS: IWizard[] = this._getWizardItems();

    ITEMS.push({...item, _id: Date.now()});

    localStorage.setItem('wizard', JSON.stringify(ITEMS))
  }

  protected editWizardItem(wizard: IWizard)
  {
    const ITEMS: IWizard[] = this._getWizardItems();

    const INDEX = ITEMS.findIndex(item => item._id == wizard._id);

    ITEMS[INDEX] = {...ITEMS[INDEX], ...wizard};

    localStorage.setItem('wizard', JSON.stringify(ITEMS));
  }

  protected _removeWizardItem(itemID: string)
  {
    const ITEMS: IWizard[] = this._getWizardItems();

    const INDEX = ITEMS.findIndex(item => item._id == itemID)

    if (INDEX !== -1)
    {
      ITEMS.splice(INDEX, 1);

      localStorage.setItem('wizard', JSON.stringify(ITEMS));
    }
  }
}
