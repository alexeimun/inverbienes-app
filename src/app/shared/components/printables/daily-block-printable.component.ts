import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService, ReportService } from '@app/@core/services';
import { PrintMisc } from '@app/@core/misc';
import { Movement } from '@app/@core/models';
import * as jsPDF from 'jspdf';
import { PaymentType } from '@app/@core/enums';
import { Storage } from '@app/@core';
import * as moment from 'moment';

@Component({
  selector: 'daily-block-printable',
  template: ''
})
export class DailyBlockPrintableComponent extends PrintMisc implements OnInit, OnDestroy {
  constructor(private service: ReportService,
              protected commonService: CommonService) {
    super();
  }

  generate(start_date: string, end_date: string) {
    return this.service.fetchDailyBlock(start_date, end_date).toPromise().then(response => {
      this.render(response);
    });
  }

  render(data: { movements: Movement[], consecutive: number }) {
    this.pdf = new (jsPDF as any)('portrait');
    this.settings(`Informe de ingresos diarios`);
    const doc = this.pdf;

    this.marX = 40;
    let r = 0;

    this.text('CUADRE DIARIO', 0, 10, 'C');
    this.setXY(this.marX, 10 + ++r * 6);
    this.row([
      {text: 'RECIBO', width: 30},
      {text: 'VALOR', width: 30},
      {text: '%', width: 10},
      {text: 'ADMON', width: 30},
      {text: 'COMISIÓN', width: 30}
    ], {align: 'C', font_style: 'bold'});
    let totalCommision = 0, totalAdmin = 0, commision = 0, admon = 0;
    data.movements.forEach(movement => {
      commision = this.getCommission(movement);
      admon = this.getAdmon(movement);
      totalCommision += commision;
      totalAdmin += admon;
      this.setXY(this.marX, 10 + ++r * 6);
      this.row([
        {text: `${movement.consecutive}`, width: 30, align: 'C'},
        {text: this.toCash(movement.value), width: 30},
        {text: this.drawPercentNumber(movement), width: 10, align: 'C'},
        {text: admon ? this.toCash(admon) : '-', width: 30},
        {text: commision ? this.toCash(commision) : '-', width: 30}
      ], {align: 'R'});
    });
    this.setXY(this.marX, 10 + ++r * 6);
    this.row([
      {text: 'TOTAL', width: 30, align: 'C'},
      {text: '', width: 30},
      {text: '', width: 10, align: 'C'},
      {text: this.toCash(totalAdmin), width: 30},
      {text: this.toCash(totalCommision), width: 30}
    ], {align: 'R', font_style: 'bold'});

    this.setFont(10, 'bold');
    this.text(`CUADRE N° ${data.consecutive}`, 40, ++r * 10 + 10);
    this.text(`TOTAL ENTREGADO: ${this.toCash(totalAdmin + totalCommision)}`, 98, r * 10 + 10);
    this.text(`Preparado por ${Storage.get('user').name} en ${moment().format('LL')}`, 0, ++r * 10 + 10, 'C');

    this.expose(doc.output('datauristring'));
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

}
