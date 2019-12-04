import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '@app/@theme/theme.module';
import { FilterPipe } from '@app/shared/filters';
import { DebtorSelectComponent } from '@app/shared/components/debtor-select/debtor-select.component';
import { CreditorSelectComponent } from '@app/shared/components/creditor-select/creditor-select.component';
import { ImmovableSelectComponent } from '@app/shared/components/immovable-select/immovable-select.component';
import { MortgageSelectComponent } from '@app/shared/components/mortgage-select/mortgage-select.component';
import { ClientInfoComponent } from '@app/shared/components/mortgage-info/info-tabs/client-info/client-info.component';
import { ClientInterestComponent } from '@app/shared/components/mortgage-info/info-tabs/client-interest/client-interest.component';
import { InvoicePrintableComponent } from '@app/shared/components/printables/invoice-printable.component';
import { ClientPaymentComponent } from '@app/shared/components/mortgage-info/info-tabs/client-payment/client-payment.component';
import { PeaceAndSavePrintableComponent } from '@app/shared/components/printables/peace-and-save-printable.component';
import { ReportDebtorPrintableComponent } from '@app/shared/components/printables/report-debtor-printable.component';
import { DailyIncomePrintableComponent } from '@app/shared/components/printables/daily-income-printable.component';
import { DailyBlockPrintableComponent } from '@app/shared/components/printables/daily-block-printable.component';
import { ReportCreditorPrintableComponent } from '@app/shared/components/printables/report-creditor-printable.component';
import { StatusCardComponent } from '@app/shared/components/status-card/status-card.component';
import { MortgageInfoComponent } from '@app/shared/components/mortgage-info/mortgage-info.component';
import { NbCardModule, NbCheckboxModule, NbTabsetModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

const PRINTABLES = [
  InvoicePrintableComponent,
  PeaceAndSavePrintableComponent,
  ReportDebtorPrintableComponent,
  DailyIncomePrintableComponent,
  DailyBlockPrintableComponent,
  ReportCreditorPrintableComponent,
  MortgageInfoComponent
];
const COMPONENTS = [
  ...PRINTABLES,
  DebtorSelectComponent,
  CreditorSelectComponent,
  ImmovableSelectComponent,
  MortgageSelectComponent,
  ClientInfoComponent,
  ClientInterestComponent,
  StatusCardComponent,
  FilterPipe,
  ClientPaymentComponent
];

@NgModule({
  imports: [CommonModule, NbTabsetModule, NbCardModule, ThemeModule,
    NbCheckboxModule, FormsModule],
  declarations: [
    ...COMPONENTS
  ],
  exports: [...COMPONENTS]
})
export class SharedModule {
}
