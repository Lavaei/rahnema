import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector:    'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls:   ['./checkboxes.component.scss'],
  providers:   [
    {
      provide:     NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxesComponent),
      multi:       true
    }
  ]
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor
{

  @Input()
  items: { _id: string, label: string }[] = [];


  protected _selectedValues: string[] = [];
  protected _propagateChange          = (_: any) => {
  };

  constructor()
  {
  }

  ngOnInit(): void
  {
  }

  registerOnChange(fn: any): void
  {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any): void
  {
  }

  writeValue(selectedValues: string[]): void
  {
    if (typeof selectedValues !== "undefined")
    {
      this._selectedValues = selectedValues;
    }
  }

  isItemChecked(itemID: string): boolean
  {
    return this._selectedValues.includes(itemID);
  }

  onChangeHandler(itemID: string, isChecked: boolean): void
  {
    const INDEX: number = this._selectedValues.indexOf(itemID);

    if (isChecked && INDEX === -1)
    {
      this._selectedValues = [...this._selectedValues, itemID];
    }
    else if (!isChecked && INDEX !== -1)
    {
      this._selectedValues.splice(INDEX, 1);
    }

    this._propagateChange(this._selectedValues);
  }
}
