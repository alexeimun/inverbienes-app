import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService, ReportService } from '@app/@core/services';
import { PrintMisc } from '@app/@core/misc';
import { Movement } from '@app/@core/models';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';
import { Storage } from '@app/@core';

@Component({
  selector: 'daily-income-printable',
  template: ''
})
export class DailyIncomePrintableComponent extends PrintMisc implements OnInit, OnDestroy {
  constructor(private service: ReportService,
              protected commonService: CommonService) {
    super();
  }

  generate(date: string) {
    return this.service.fetchDailyIncomes(date).toPromise().then(movements => {
      this.render(movements, date);
    });
  }

  render(movements: Movement[], date: string) {
    this.pdf = new (jsPDF as any)('portrait');
    this.settings(`Informe de ingresos diarios - ${moment(date).format('ll')}`);
    const doc = this.pdf;

    this.setFont(14, 'bold');
    this.text(`Informe de ingresos diarios - ${moment(date).format('ll')}`, this.marX, 18, 'C');
    let r = 0;
    this.setXY(this.marX, 25);
    this.row([{text: 'Recibo', width: 20},
      {text: 'Deudor', width: 65},
      {text: 'Acreedor', width: 65},
      {text: 'Valor', width: 30}], {font_style: 'bold'});

    let total = 0;
    movements.forEach(movement => {
      total += movement.value;
      this.setXY(this.marX, 25 + ++r * 6);
      this.row([
        {text: `${movement.consecutive}`, width: 20},
        {text: movement.mortgage.debtor.name, width: 65},
        {text: movement.mortgage.creditor.name, width: 65},
        {text: this.toCash(movement.value), width: 30}
      ]);
      if (r > 42) {
        doc.addPage();
        r = 0;
      }
    });
    this.setXY(this.marX, 25 + ++r * 6);
    this.row([{text: 'Total:', width: 150, align: 'R'},
      {text: this.toCash(total), width: 30}], {font_style: 'bold'});

    this.setFont(10, 'bold');
    doc.text(`Elaborado por ${Storage.get('user').name} en ${moment().format('MMMM DD/YYYY')}`, 50, 40 + ++r * 6);

    this.expose(doc.output('datauristring'));
  }

}
