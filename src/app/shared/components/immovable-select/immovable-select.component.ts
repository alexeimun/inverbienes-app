import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Immovable } from '@app/@core/models';
import { ImmovableService } from '@app/@core/services';

@Component({
  selector: 'immovable-select',
  templateUrl: 'immovable-select.component.html',
  styleUrls: ['immovable-select.component.sass'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: ImmovableSelectComponent, multi: true}
  ]
})
export class ImmovableSelectComponent implements ControlValueAccessor {
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;
  private _immovable_id: number;
  private _debtor_id: number;
  immovables: Immovable[];
  showList = false;
  input: string = '';
  @Input() readonly: boolean = false;

  @Input()
  set debtor_id(id: number) {
    this.immovables = [];
    this._debtor_id = id;
    id && this.fetchData(id);
  }

  constructor(private service: ImmovableService) {
  }

  selectSearchResult(immovable: Immovable) {
    this.input = immovable.address;
    this.onChangeCallback(immovable.id);
    this.toggleList(false);
  }

  toggleList(show: boolean) {
    if (!show)
      setTimeout(() => this.showList = false, 200);
    else this.showList = true;
  }

  fetchData(id: number) {
    return this.service.fetchByDebtor(id, !this.readonly).toPromise().then(immovables => this.immovables = immovables);
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public writeValue(value: any) {
    this._immovable_id = value;
    this._debtor_id && this.fetchData(this._debtor_id).then(() => {
      this.input = ((<any>this.immovables).find(d => d.id == value) || {}).registration;
    });
  }
}
