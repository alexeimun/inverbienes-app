import { NbIconConfig, NbToastrService } from '@nebular/theme';

export class ToolkitService {
  toast: NbToastrService;

  public presentSuccessToast(body: string) {
    const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva', status: 'success'};
    this.toast.show(body, `¡Tarea exitosa!`, iconConfig);
  }

  public presentWarningToast(body: string) {
    const iconConfig: NbIconConfig = {icon: 'alert-triangle-outline', pack: 'eva', status: 'warning'};
    this.toast.show(body, `¡Alerta!`, iconConfig);
  }

  public presentErrorToast(body: string) {
    const iconConfig: NbIconConfig = {icon: 'alert-circle-outline', pack: 'eva', status: 'danger'};
    this.toast.show(body, `¡Hubo un error!`, iconConfig);
  }
}
