import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService, CreditorService } from '@app/@core/services';
import { PrintMisc } from '@app/@core/misc';
import * as jsPDF from 'jspdf';
import { CreditorReport } from '@app/@core/models/creditor-report';
import { lt, ucfirst } from '@app/@core/helpers';
import { PaymentType } from '@app/@core/enums';

@Component({
  selector: 'report-creditor-printable',
  template: ''
})
export class ReportCreditorPrintableComponent extends PrintMisc implements OnInit, OnDestroy {
  constructor(private service: CreditorService,
              protected commonService: CommonService) {
    super();
  }

  generate(options: any) {
    return this.service.fetchReport(options).toPromise().then(report => {
      this.render(report);
    });
  }

  render(report: CreditorReport) {
    this.pdf = new (jsPDF as any)('portrait');
    this.settings(`INFORME ${report.creditor.name.toUpperCase()}`);
    const doc = this.pdf;

    let r = 0;
    const movements = (<any>report.mortgages).map(mortgage => {
      return mortgage.movements.map(movement => {
        return {
          value: movement.value,
          concept: movement.concept,
          consecutive: movement.consecutive,
          fee_admin: mortgage.fee_admin,
          debtor: mortgage.debtor,
          type: movement.type
        };
      });
    }).flat();
    this.marX = 5;

    this.text(`INFORME ${report.creditor.name.toUpperCase()}`, this.marX, 10, 'C');
    this.setXY(this.marX, 10 + ++r * 6);
    this.row([{text: 'DEUDOR:', width: 50},
      {text: 'CONCEPTO:', width: 69},
      {text: 'RCBO:', width: 20},
      {text: 'VALOR:', width: 20},
      {text: '%', width: 6},
      {text: 'ADMON', width: 15},
      {text: 'TOTAL', width: 20}
    ], {align: 'C', font_style: 'bold'});
    let total = 0;
    movements.forEach(movement => {
      total += movement.value - (movement.type != PaymentType.Payment ? movement.value * movement.fee_admin / 100 : 0);
      this.setXY(this.marX, 10 + ++r * 6);
      this.row([{text: lt(movement.debtor.name, 22), width: 50},
        {text: lt(ucfirst(movement.concept.toLowerCase()), 42), width: 69},
        {text: `${movement.consecutive}`, width: 20},
        {text: this.toCash(movement.value), width: 20},
        {text: `${movement.type != PaymentType.Payment ? movement.fee_admin + '%' : '-'}`, width: 6}, {
          text: movement.type != PaymentType.Payment ? this.toCash(movement.value * movement.fee_admin / 100) : '-',
          width: 15
        },
        {
          text: this.toCash(movement.value - (movement.type != PaymentType.Payment ? movement.value * movement.fee_admin / 100 : 0)),
          width: 20
        }
      ], {align: 'C'});
      if (r > 44) {
        doc.addPage();
        r = 0;
      }
    });
    this.setXY(this.marX + 50, 10 + ++r * 6);
    this.row([
      {text: 'TOTAL CUADRE:', width: 130, align: 'R'},
      {text: this.toCash(total), width: 20, align: 'R'}
    ], {align: 'C', font_style: 'B'});

    this.expose(doc.output('datauristring'));
  }

}
