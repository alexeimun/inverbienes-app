import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '@app/@core/services';
import { FormBuilder } from '@angular/forms';
import { Solicitude } from '@app/@core/models';
import { FORM_FIELDS } from '@app/pages/financial/report/peace-and-save/peace-and-save.misc';
import { PeaceAndSavePrintableComponent } from '@app/shared/components/printables/peace-and-save-printable.component';
import { DataMisc } from '@app/@core/misc';

@Component({
  selector: 'page-peace-and-save',
  templateUrl: './peace-and-save.component.html',
  styleUrls: ['./peace-and-save.component.sass']
})
export class PeaceAndSaveComponent extends DataMisc implements OnInit {
  @ViewChild(PeaceAndSavePrintableComponent, {static: false})
  private paeceAndSavePrintable: PeaceAndSavePrintableComponent;
  mortgage: Solicitude;

  constructor(protected service: InvoiceService,
              private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group(FORM_FIELDS);
  }

  onChange(mortgage: Solicitude) {
    this.mortgage = mortgage;
  }

  print() {
    this.loader = true;
    this.paeceAndSavePrintable.generate(this.form.value.mortgage_id, this.form.value.date).then(() => {
      this.loader = false;
    });
  }
}
