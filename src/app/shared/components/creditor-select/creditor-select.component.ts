import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Creditor } from '@app/@core/models';
import { CreditorService } from '@app/@core/services';

@Component({
  selector: 'creditor-select',
  templateUrl: './creditor-select.component.html',
  styleUrls: ['./creditor-select.component.sass'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: CreditorSelectComponent, multi: true}
  ]
})
export class CreditorSelectComponent implements ControlValueAccessor {
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;
  private _creditor_id: number;
  creditors: Creditor[] = [];
  showList = false;
  input: string = '';
  @Input() readonly: boolean = false;

  constructor(private service: CreditorService) {
  }

  selectSearchResult(creditor: Creditor) {
    this.input = creditor.name;
    this.onChangeCallback(creditor.id);
    this.toggleList(false);
  }

  toggleList(show: boolean) {
    if (!show)
      setTimeout(() => this.showList = false, 200);
    else this.showList = true;
  }

  fetchData() {
    if (!this.creditors.length)
      return this.service.fetchAll().toPromise().then(creditors => this.creditors = creditors);
    return new Promise(resolve => resolve(this.creditors));
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public writeValue(value: any) {
    this._creditor_id = value;
    this.fetchData().then(() => {
      this.input = (this.creditors.find(d => d.id == value) || {}).name;
    });
  }
}
