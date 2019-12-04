import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService, DebtorService } from '@app/@core/services';
import { PrintMisc } from '@app/@core/misc';
import { DebtorReport } from '@app/@core/models';
import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import { formatMoney } from '@app/@core/helpers';
import { PaymentType } from '@app/@core/enums';

@Component({
  selector: 'report-debtor-printable',
  template: ''
})
export class ReportDebtorPrintableComponent extends PrintMisc implements OnInit, OnDestroy {
  constructor(private service: DebtorService,
              protected commonService: CommonService) {
    super();
  }

  generate(options: any) {
    return this.service.fetchReport(options).toPromise().then(report => {
      this.render(report);
    });
  }

  render(report: DebtorReport) {
    this.pdf = new (jsPDF as any)('portrait');
    this.settings(`Informe del deudor - ${report.debtor.name}`);
    const doc = this.pdf;

    let r = 0;
    this.setFont(14, 'bold');
    doc.text('INFORME DEL DEUDOR', this.marX, 18);
    this.setFont(11);
    this.setFont(10, 'bold');
    doc.text(report.debtor.name.toUpperCase(), this.marX, 30);
    this.setFont(11);
    doc.text(report.debtor.document, this.marX, 32 + ++r * 6);
    doc.text(`tel. ${report.debtor.phone}`, this.marX, 32 + ++r * 6);
    doc.text(`dir. ${report.debtor.address}`, this.marX, 32 + ++r * 6);
    r += 2;

    if (!report.mortgages.length) {
      this.setFont(11, 'bold');
      doc.text(`Este deudor no tiene hipotecas actualmente`, this.marX, 28 + r * 6);
    }

    report.mortgages.forEach((mortgage, index) => {
      doc.line(195, 30 + r * 6, this.marX, 30 + r * 6);
      this.setFont(11, 'bold');
      doc.text(`Solicitud hipoteca #${mortgage.consecutive}`, this.marX, 28 + r * 6);
      this.setFont(10);
      doc.text(`Fecha constitución: ${moment(mortgage.immovable.constitution).format('MMMM DD/YYYY')}`, this.marX, 32 + ++r * 6);
      doc.text(`Hipoteca ${mortgage.type}`, this.marX, 32 + ++r * 6);
      doc.text(`Escritura Nro ${mortgage.immovable.writting_number}`, this.marX, 32 + ++r * 6);
      doc.text(`Notaría Nro ${mortgage.immovable.notary}`, this.marX, 32 + ++r * 6);
      doc.text(`M.I No ${mortgage.immovable.registration}`, this.marX, 32 + ++r * 6);
      doc.text(mortgage.immovable.address, this.marX, 32 + ++r * 6);
      r++;
      this.setFont(10, 'bold');
      doc.text(`Acreedor: ${mortgage.creditor.name}`, this.marX, 32 + ++r * 6);
      doc.text(`Capital inicial: ${formatMoney(mortgage.initial_balance)}`, this.marX, 32 + ++r * 6);
      doc.text(`Capital actual: ${formatMoney(mortgage.capital)}`, this.marX, 32 + ++r * 6);
      this.setFont(11, 'bold');
      r++;
      doc.text('Pagado', this.marX, 33 + ++r * 6);
      this.setXY(this.marX, 32 + ++r * 6);
      this.row([{text: 'Concepto', width: 120}, {text: 'Valor'}], {font_style: 'bold'});

      //Paid table
      let total = 0;
      mortgage.paids.forEach(paid => {
        let concept = paid.concept;
        total += paid.value;
        if (paid.type == PaymentType.Interest)
          concept = `Int de ${moment(mortgage.start_date).format('MMMM DD/YYYY')} a ${moment(paid.up_month).format('MMMM DD/YYYY')}`;
        this.setXY(this.marX, 32 + ++r * 6);
        this.row([{text: concept, width: 120}, {text: this.toCash(paid.value)}]);
        if (r > 40) {
          doc.addPage();
          r = 0;
        }
      });
      this.setXY(this.marX, 32 + ++r * 6);
      this.row([{text: 'Total:', width: 120}, {text: this.toCash(total), align: 'L'}], {
        align: 'R', font_style: 'bold'
      });

      //Debt table
      r++;
      doc.text('Debe', this.marX, 33 + ++r * 6);
      this.setXY(this.marX, 32 + ++r * 6);
      this.row([{text: 'Concepto', width: 120}, {text: 'Valor'}], {font_style: 'bold'});
      total = 0;
      mortgage.debts.forEach(debt => {
        let concept = debt.concept;
        total += debt.value;
        if (debt.type == PaymentType.Interest)
          concept = `Int de ${moment(debt.from_month).format('MMMM DD/YYYY')} a ${moment(debt.up_month).format('MMMM DD/YYYY')}`;
        this.setXY(this.marX, 32 + ++r * 6);
        this.row([{text: concept, width: 120}, {text: this.toCash(debt.value)}]);
      });
      this.setXY(this.marX, 32 + ++r * 6);
      this.row([{text: 'Total:', width: 120}, {text: this.toCash(total), align: 'L'}], {
        align: 'R', font_style: 'bold'
      });

      if (index < report.mortgages.length - 1)
        doc.addPage();
      r = 0;
    });

    this.expose(doc.output('datauristring'));
  }

}
