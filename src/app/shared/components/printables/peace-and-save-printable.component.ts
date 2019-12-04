import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService, MortgageService } from '@app/@core/services';
import { PrintMisc } from '@app/@core/misc';
import { Company, Solicitude } from '@app/@core/models';
import * as moment from 'moment';
import * as jsPDF from 'jspdf';
import { formatMoney } from '@app/@core/helpers';
import { CompanyService } from '@app/@core/services/company.service';

@Component({
  selector: 'peace-and-save-printable',
  template: ''
})
export class PeaceAndSavePrintableComponent extends PrintMisc implements OnInit, OnDestroy {
  constructor(private service: MortgageService,
              private companyService: CompanyService,
              protected commonService: CommonService) {
    super();
  }

  generate(mortgage_id: number, date: string) {
    return this.service.fetchOne(mortgage_id).toPromise().then(mortgage => {
      return this.companyService.fetch().toPromise().then(company => {
        this.render(mortgage, date, company);
      });
    });
  }

  render(mortgage: Solicitude, date: string, company: Company) {
    this.pdf = new (jsPDF as any)('portrait');
    this.settings(`Paz y salvo - ${mortgage.debtor.name}`);
    const doc = this.pdf;
    doc.setFontStyle('bold');
    doc.setFontSize(12);
    doc.text('CERTIFICADO DE PAZ Y SALVO', 70, 15);
    doc.setFontStyle('normal');
    doc.setFontSize(10);
    doc.text(`Medellín, ${moment().format('ll')}`, 20, 25);
    this.multiline(`Certificamos que: El (La) señor(a) ${mortgage.debtor.name.toUpperCase()} (a) con cédula de ciudadanía No. ${formatMoney(mortgage.debtor.document)} se encuentra a PAZ SALVO Por todo concepto con el señor (A) ${mortgage.creditor.name.toUpperCase()}. Y la empresa INVERBIENES LTDA.`, 20, 35);
    doc.setFontStyle('italic');
    doc.text(`Fecha de Cancelación: ${moment(date).format('MMMM DD/YYYY')}`, 20, 57);
    doc.text(`Esc. No. ${mortgage.immovable.writting_number} DE ${moment(mortgage.immovable.constitution).format('MMMM DD/YYYY').toUpperCase()}`, 20, 62);
    doc.text(`Notaría ${company.notary} del Círculo de Medellín`, 20, 67);
    doc.line(85, 95, 155, 95);
    doc.setFontStyle('bold');
    doc.text(`PROTOCOLISTA ${company.protocolist_name} TELEFONO ${company.protocolist_phone}`, 40, 77);
    doc.setFontSize(10);
    doc.setFontStyle('normal');
    doc.text('Firma y sello de INVERBIENES LTDA.', 90, 100);
    doc.setFontSize(7);
    doc.text('RECUERDE REALIZAR LA CANCELACIÓN EN NOTARIA', 90, 108);
    doc.text('RENTAS Y REGISTRO', 106, 112);
    this.expose(doc.output('datauristring'));
  }

}
