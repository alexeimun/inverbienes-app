import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService, InvoiceService } from '@app/@core/services';
import { PrintMisc } from '@app/@core/misc';
import { Invoice } from '@app/@core/models';
import { Storage } from '@app/@core';
import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import { lt } from '@app/@core/helpers';

@Component({
  selector: 'invoice-printable',
  template: ''
})
export class InvoicePrintableComponent extends PrintMisc implements OnInit, OnDestroy {
  constructor(private service: InvoiceService,
              protected commonService: CommonService) {
    super();
  }

  generate(invoice_id: number, is_new = false) {
    this.service.fetchOne(invoice_id).toPromise().then(invoice => this.render(invoice, is_new));
  }

  render(invoice: Invoice, is_new: boolean) {
    this.pdf = new (jsPDF as any)('portrait');
    this.settings(`Recibo - #${invoice.consecutive}`);
    const doc = this.pdf;
    doc.setFontStyle('bold');
    doc.setFontSize(10);
   // !is_new && this.cell(165, 3, 26, 6, invoice.cancelled_date ? 'ANULADO' : 'DUPLICADO');
    doc.setFontStyle('normal');
    doc.roundedRect(10, 10, 185, 36, 10, 10, 'S');
    doc.text('Compra y Venta de Propiedad Raíz, Arrendamientos, Asesoría Jurídica, Dinero a Interés', 40, 14);
    doc.line(194, 40, 11, 40);
    //Headers rows
    doc.setFontStyle('bold');
    doc.text('Fecha', 30, 20);
    doc.text('Deudor', 28, 26);
    doc.text('Acreedor', 25, 32);
    doc.text('Direcc. Inmueble', 20, 38);

    //Table
    doc.text('Item', 22, 44);
    doc.text('CONCEPTO', 70, 44);
    doc.text('VALOR', 170, 44);
    //Parameters
    doc.text('Recibo Nro', 140, 20);
    doc.text('Ciudad', 155, 26);
    doc.text('Capital inicial', 140, 32);
    doc.text('Saldo actual', 140, 38);
    doc.setFontStyle('normal');
    //End Headers
    //Parameters Values
    doc.text(moment(invoice.created_at).format('DD/MM/YYYY'), 43, 20);
    doc.text(`${invoice.company.address}  Tel. ${invoice.company.phone}`, 72, 20);
    doc.text('Medellín', 169, 26);
    doc.text(this.toCash(invoice.mortgage.initial_balance), 165, 32);
    doc.text(invoice.mortgage.immovable.address, 60, 38);
    doc.text(this.toCash(invoice.capital), 165, 38);
    doc.setFontStyle('bold');
    this.cell(165, 17, 28, 4, ' ');
    doc.text(`${invoice.consecutive}`, 176, 20);
    //End Parameters
    doc.setFontStyle('normal');
    doc.text(invoice.mortgage.debtor.document, 43, 26);
    doc.setFontStyle('bold');
    doc.text(`${invoice.mortgage.debtor.name.toUpperCase()}  Tel. ${invoice.mortgage.debtor.phone}`, 65, 26);
    doc.text(invoice.mortgage.creditor.name.toUpperCase(), 62, 32);
    doc.setFontStyle('normal');
    //Movements
    const h = 6;
    let i = 0;
    invoice.movements.reverse().forEach(movement => {
      this.cell(10, 49 + i * h, 20, 6, `${(i + 1)}`);
      this.cell(30, 49 + i * h, 120, 6, lt(movement.concept, 70));
      this.cell(150, 49 + i * h, 45, 6, this.toCash(movement.value));
      i++;
    });

    //TOTAL RECIBO
    doc.setFontStyle('bold');
    this.cell(10, 52 + i * h, 140, 6, 'Total Recibo');
    this.cell(150, 52 + i * h, 45, 6, this.toCash(invoice.total));
    i++;
    //LEYEND
    this.cell(10, 55 + i * h, 140, 12, '');
    doc.text('Pago', 13, 60 + i * h);
    doc.text('Banco', 50, 60 + i * h);
    doc.text('Nro', 100, 60 + i * h);
    doc.setFontStyle('normal');
    //Values
    doc.text(24, 60 + i * h, invoice.pay_type == 1 ? 'Efectivo' : 'Consignación'); //Pago value
    doc.text(61, 60 + i * h, invoice.bank || ' ');
    doc.text(106, 60 + i * h, invoice.check || ' ');
    doc.setFontStyle('bold');
    doc.text(30, 65 + i * h, 'POR FAVOR PRESENTE ESTE RECIBO EN EL PRÓXIMO PAGO'); //Aviso
    doc.setFontStyle('normal');
    this.cell(150, 55 + i * h, 45, 12);
    doc.setFontStyle('bold');
    doc.text('Elaborado Por', 152, 60 + i * h);
    doc.setFontStyle('normal');
    doc.text(Storage.get('user').name, 152, 65 + i * h);
    doc.setFontStyle('bold');
    !is_new && this.cell(169, 68 + i * h, 26, 6, invoice.cancelled_date ? 'ANULADO' : 'DUPLICADO');
    this.expose(doc.output('datauristring'));
  }

}
