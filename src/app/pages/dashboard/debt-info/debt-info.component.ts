import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitude } from '@app/@core/models';
import { MortgageService } from '@app/@core/services';
import { InvoicePrintableComponent } from '@app/shared/components/printables/invoice-printable.component';
import { NbWindowService } from '@nebular/theme';
import { DataMisc } from '@app/@core/misc';

@Component({
  selector: 'dashboard',
  styleUrls: ['dashboard.component.sass'],
  templateUrl: 'debt-info.component.html'
})
export class DebtInfoComponent extends DataMisc implements OnInit {
  mortgage: Solicitude;
  data: any;
  @ViewChild(InvoicePrintableComponent, {static: false})
  private invoicePrintable: InvoicePrintableComponent;

  constructor(private mortgageService: MortgageService,
              protected windowService: NbWindowService) {
    super();
  }

  ngOnInit(): void {
    const mortgage_id = this.data.mortgage_id;
    this.mortgageService.fetchOne(mortgage_id).toPromise().then(mortgage => {
      this.mortgage = mortgage;
    });
  }

  printInvoice(invoice_id: number) {
    this.closeWindow();
    this.invoicePrintable.generate(invoice_id);
  }
}
