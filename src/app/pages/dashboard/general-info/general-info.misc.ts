import { DataMisc } from '@app/@core/misc';
import { InterestState, InterestStateName } from '@app/@core/enums';

export interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  link: string;
}

export const TABLE_SETTINGS = {
  mode: 'external',
  actions: {
    add: false,
    edit: true,
    delete: false,
    columnTitle: ''
  },
  edit: {
    editButtonContent: '<i class="nb-search"></i>'
  },
  columns: {
    debtor: {
      title: 'Deudor',
      type: 'string'
    },
    creditor: {
      title: 'Acreedor',
      type: 'string'
    },
    registration: {
      title: 'Matricula inmobiliaria',
      type: 'string'
    },
    start_date: {
      title: 'Inicio en',
      type: 'string'
    },
    final_date: {
      title: 'Vence en',
      type: 'string'
    }
  }
};

export const TABLE_SETTINGS_INTEREST = {
  mode: 'external',
  actions: {
    add: false,
    edit: true,
    delete: false,
    columnTitle: ''
  },
  edit: {
    editButtonContent: '<i class="nb-search"></i>'
  },
  columns: {
    debtor: {
      title: 'Deudor',
      type: 'string'
    },
    state: {
      title: 'Estado',
      type: 'string'
    },
    to_date: {
      title: 'Fecha interés',
      type: 'string'
    },
    value: {
      title: 'Valor',
      type: 'string'
    }
  }
};

export function getInterestState(state: InterestState) {
  switch (state) {
    case InterestState.Debt:
      return InterestStateName.Debt;
    case InterestState.Paid:
      return InterestStateName.Paid;
    case InterestState.NotPaid:
      return InterestStateName.NotPaid;
  }

}

export class GeneralInfoMisc extends DataMisc {

  debtorCard: CardSettings = {
    title: 'Deudores',
    iconClass: 'fa fa-users',
    type: 'primary',
    link: 'client/debtor'
  };
  creditorCard: CardSettings = {
    title: 'Acreedores',
    iconClass: 'fa fa-users',
    type: 'success',
    link: 'client/creditor'
  };
  mortgageCard: CardSettings = {
    title: 'Hipotecas',
    iconClass: 'fa fa-cubes',
    type: 'info',
    link: 'mortgage/solicitude'
  };
  immovableCard: CardSettings = {
    title: 'Inmuebles',
    iconClass: 'fa fa-home',
    type: 'warning',
    link: 'mortgage/immovable'
  };

  statusCards: CardSettings[];

  commonStatusCardsSet: CardSettings[] = [
    this.debtorCard,
    this.creditorCard,
    this.mortgageCard,
    this.immovableCard
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    dark: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.debtorCard,
        type: 'warning'
      },
      {
        ...this.creditorCard,
        type: 'primary'
      },
      {
        ...this.mortgageCard,
        type: 'danger'
      },
      {
        ...this.immovableCard,
        type: 'success'
      }
    ]
  };

}
