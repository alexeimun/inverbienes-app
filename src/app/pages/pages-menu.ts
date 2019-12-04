import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true
  },
  {
    title: 'MODULOS',
    group: true
  },
  {
    title: 'Clientes',
    icon: 'people-outline',
    link: '/pages/client',
    children: [
      {
        title: 'Deudores',
        link: '/pages/client/debtor'
      },
      {
        title: 'Acreedores',
        link: '/pages/client/creditor'
      }
    ]
  },
  {
    title: 'Financiero',
    icon: 'bar-chart-2-outline',
    children: [
      {
        title: 'Recibos',
        link: '/pages/financial',
        children: [
          {
            title: 'Crear recibo',
            link: '/pages/financial/invoice/create-invoice'
          },
          {
            title: 'Recibos',
            link: '/pages/financial/invoice'
          }
        ]
      },
      {
        title: 'Informes',
        link: '/pages/financial',
        children: [
          {
            title: 'Informe deudor',
            link: '/pages/financial/report/report-debtor',
          },
          {
            title: 'Informe acreedor',
            link: '/pages/financial/report/report-creditor',
          },
          {
            title: 'Cuadre diario',
            link: '/pages/financial/report/daily-block',
          }, {
            title: 'Ingresos diarios',
            link: '/pages/financial/report/daily-income',
          }, {
            title: 'Acreedores vs Deudores',
            link: '/pages/financial/report/creditor-debtor',
          }, {
            title: 'Paz y salvo',
            link: '/pages/financial/report/peace-and-save'
          }
        ]
      }
    ]
  },
  {
    title: 'Hipotecas',
    icon: 'cube-outline',
    children: [
      {
        title: 'Solicitudes',
        link: '/pages/mortgage/solicitude'
      },
      {
        title: 'Inmuebles',
        link: '/pages/mortgage/immovable'
      }
    ]
  },
  {
    title: 'Sesión crédito',
    icon: 'layers-outline',
    children: [
      {
        title: 'Acreedores',
        link: '/pages/credit-session/creditor'
      },
      {
        title: 'Deudores',
        link: '/pages/credit-session/debtor'
      }
    ]
  },
  {
    title: 'Configuración',
    icon: 'settings-2-outline',
    children: [
      {
        title: 'Empresa',
        link: '/pages/general/company',
        icon: 'globe-outline'
      },
      {
        title: 'Consecutivos',
        link: '/pages/general/consecutive',
        icon: 'hash-outline'
      }
    ]
  }
];
