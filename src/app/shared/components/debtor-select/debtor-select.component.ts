import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DebtorService } from '@app/@core/services';
import { Debtor } from '@app/@core/models';

@Component({
  selector: 'debtor-select',
  templateUrl: 'debtor-select.component.html',
  styleUrls: ['debtor-select.component.sass'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: DebtorSelectComponent, multi: true}
  ]
})
export class DebtorSelectComponent implements ControlValueAccessor {
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;
  private _debtor_id: number;
  debtors: Debtor[] = [];
  showList = false;
  input: string = '';
  @Input() readonly: boolean = false;
  @Output() change = new EventEmitter;

  constructor(private service: DebtorService) {
  }

  selectSearchResult(debtor: Debtor) {
    this.change.emit(debtor);
    this.input = debtor.name;
    this.onChangeCallback(debtor.id);
    this.toggleList(false);
  }

  toggleList(show: boolean) {
    if (!show)
      setTimeout(() => this.showList = false, 200);
    else this.showList = true;
  }

  fetchData() {
    if (!this.debtors.length)
      return this.service.fetchAll().toPromise().then(debtors => this.debtors = debtors);
    return new Promise(resolve => resolve(this.debtors));
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public writeValue(value: any) {
    this._debtor_id = value;
    this.fetchData().then(() => {
      this.input = (this.debtors.find(d => d.id == value) || {}).name;
    });
  }
}
