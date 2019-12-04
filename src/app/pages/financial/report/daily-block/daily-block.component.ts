import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataMisc } from '@app/@core/misc';
import { FORM_FIELDS } from '@app/pages/financial/report/daily-block/daily-block.misc';
import { DailyBlockPrintableComponent } from '@app/shared/components/printables/daily-block-printable.component';
import { XlsxService } from '@app/@core/services/xlsx.service';
import { Movement } from '@app/@core/models';
import { PaymentType } from '@app/@core/enums';
import { formatMoney } from '@app/@core/helpers';
import { ReportService } from '@app/@core/services';
import { InvoicePrintableComponent } from "@app/shared/components/printables/invoice-printable.component";

@Component({
  selector: 'page-daily-block',
  templateUrl: './daily-block.component.html',
  styleUrls: ['./daily-block.component.sass']
})
export class DailyBlockComponent extends DataMisc implements OnInit {
  @ViewChild(DailyBlockPrintableComponent, {static: false})
  private dailyBlockPrintable: DailyBlockPrintableComponent;

  constructor(private formBuilder: FormBuilder,
              private reportService: ReportService,
              private excelService: XlsxService) {
    super();
  }

  ngOnInit() {
    this.form = this.formBuilder.group(FORM_FIELDS);
  }

  generate(start_date: string, end_date: string) {
    return this.reportService.fetchDailyBlock(start_date, end_date).toPromise().then(response => {
      this.exportAsXLSX(response);
    });
  }

  exportAsXLSX(data: any): void {
    const table = [];

    let totalCommision = 0, totalAdmin = 0, commision = 0, admon = 0;
    data.movements.forEach(movement => {
      if (!movement.mortgage) return;
      commision = this.getCommission(movement);
      admon = this.getAdmon(movement);
      totalCommision += commision;
      totalAdmin += admon;
      table.push({
        'FECHA DE INGRESO': `${movement.created_at}`,
        RECIBO: `${movement.consecutive}`,
        'NOMBRE DEL DEUDOR': `${movement.mortgage.debtor.name}`,
        'NOMBRE DEL ACREEDOR': `${movement.mortgage.creditor.name}`,
        'VALOR INGRESADO': movement.value,
        '% DE ADMON': this.drawPercentNumber(movement),
        'VALOR DE ADMON': admon ? admon : '-',
        'VALOR DE COMISION': commision ? commision : '-'
      });
    });

    table.push({
      'FECHA DE INGRESO': '',
      RECIBO: 'TOTAL',
      'VALOR INGRESADO': '',
      '% DE ADMON': '',
      'NOMBRE DEL DEUDOR': '',
      'NOMBRE DEL ACREEDOR': '',
      'VALOR DE ADMON': totalAdmin,
      'VALOR DE COMISION': totalCommision
    });

    this.excelService.exportAsExcelFile(table, `Cuadre diario - Total entregado: ${formatMoney(totalCommision + totalAdmin)}`);
  }

  getCommission(movement: Movement): number {
    if (movement.type == PaymentType.Commission)
      return movement.value * 0.3;
    return 0;
  }

  getAdmon(movement: Movement): number {
    if (movement.type == PaymentType.Interest)
      return movement.value * movement.mortgage.fee_admin / 100;
    return 0;
  }

  drawPercentNumber(movement: Movement): string {
    switch (movement.type) {
      case PaymentType.Commission:
        return '30%';
      case PaymentType.Interest:
        return `${movement.mortgage.fee_admin}%`;
      default:
        return '-';
    }
  }

  print() {
    this.loader = true;
    this.generate(this.form.value.start_date, this.form.value.end_date).then(() => {
      this.loader = false;
    });
  }
}
