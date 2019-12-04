import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Solicitude } from '@app/@core/models';
import { MortgageService } from '@app/@core/services';

@Component({
  selector: 'mortgage-select',
  templateUrl: 'mortgage-select.component.html',
  styleUrls: ['mortgage-select.component.sass'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MortgageSelectComponent, multi: true}
  ]
})
export class MortgageSelectComponent implements ControlValueAccessor {
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;
  mortgages: Solicitude[] = [];
  showList = false;
  input: string = '';
  private _mortgage_id: number;
  @Input() readonly: boolean = false;
  @Input() label = 'Solicitudes';
  @Output() onChange = new EventEmitter;

  constructor(private service: MortgageService) {
  }

  selectSearchResult(mortgage: Solicitude) {
    this.input = `${mortgage.debtor.name}`;
    this.onChangeCallback(mortgage.id);
    this.onChange.emit(mortgage);
    this.toggleList(false);
  }

  toggleList(show: boolean) {
    if (!show)
      setTimeout(() => this.showList = false, 200);
    else this.showList = true;
  }

  fetchData() {
    if (!this.mortgages.length)
      this.fetchMortgages();
    return new Promise(resolve => resolve(this.mortgages));
  }

  fetchMortgages() {
    return this.service.fetchAll().toPromise().then(mortgages => this.mortgages = mortgages);
  }

  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public writeValue(value: any) {
    this._mortgage_id = value;
    console.log(value);
    this.fetchData().then(() => {
      const immovable = (this.mortgages.find(d => d.id == value) || {}).immovable;
      if (immovable) this.input = immovable.registration;
    });
  }
}
