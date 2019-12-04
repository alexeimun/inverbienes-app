import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataMisc } from '@app/@core/misc';
import { XlsxService } from '@app/@core/services/xlsx.service';
import { CreditorDebtor } from '@app/@core/models';
import { ReportService } from '@app/@core/services';
import { FORM_FIELDS } from '@app/pages/financial/report/creditor-debtor/creditor-debtor.misc';
import * as moment from 'moment';

@Component({
  selector: 'page-creditor-debtor',
  templateUrl: 'creditor-debtor.component.html',
  styleUrls: ['creditor-debtor.component.sass']
})
export class CreditorDebtorComponent extends DataMisc implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private reportService: ReportService,
              private excelService: XlsxService) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group(FORM_FIELDS);
  }

  generate(start_date: string, end_date: string) {
    return this.reportService.fetchCreditorDebtor(start_date, end_date).toPromise().then(response => {
      this.exportAsXLSX(response);
    });
  }

  exportAsXLSX(data: CreditorDebtor[]): void {
    const table = [];
    data.forEach(row => {
      table.push({
        'NOMBRE DEUDOR': row.debtor_name,
        'NOMBRE ACRREDOR': row.creditor_name,
        'FECHA INICIO CREDITO': row.start_date,
        'FECHA DE VTO CREDITO': row.final_date,
        'CAPITAL INICIAL': row.initial_balance,
        'SALDO': row.capital,
        '% INTERES': row.interest,
        'ULTIMO MES PAGADO': row.last_paid,
        'MESES EN MOROSIDAD': row.debt_months
      });
    });

    this.excelService.exportAsExcelFile(table, `Acreedores vs Deudores - ${moment().format('DD/MM/YYYY')}`);
  }

  print() {
    this.loader = true;
    this.generate(this.form.value.start_date, this.form.value.end_date).then(() => {
      this.loader = false;
    });
  }
}
