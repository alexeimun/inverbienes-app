import { LocalDataSource } from 'ng2-smart-table';
import { CommonService, IDataMisc } from '@app/@core/interfaces';
import { ToolkitService } from '@app/@core/services';
import { City } from '@app/@core/models';
import { getFirstError, merge } from '@app/@core/helpers';
import { getCitiesFactory } from '@app/@core/common';
import { FormGroup } from '@angular/forms';
import { DELETE_CONFIRM_MSG, DELETE_SUCCEFUL_MSG, SAVE_SUCCEFUL_MSG } from '@app/@core/common/messages';
import { NbWindowRef } from '@nebular/theme';

const SETTINGS = {
  mode: 'external',
  actions: {
    add: false,
    edit: true,
    delete: true,
    columnTitle: ''
  },
  edit: {
    editButtonContent: '<i class="nb-edit"></i>',
    saveButtonContent: '<i class="nb-checkmark"></i>',
    cancelButtonContent: '<i class="nb-close"></i>',
    confirmSave: true
  },
  delete: {
    deleteButtonContent: '<i class="nb-trash"></i>',
    confirmDelete: true
  }
};

export class DataMisc implements IDataMisc {
   source = new LocalDataSource;
   loader: boolean = false;
  protected service: CommonService;
  protected settings;
  private static _toolkit: ToolkitService;
  private static windowRef: NbWindowRef;
  protected windowService: any;
  data: any;
  form: FormGroup;

  save() {
    this.loader = true;
    return this.service.save(this.form.value).toPromise().
      then(data => {
        this.closeWindow();
        this.success(data, SAVE_SUCCEFUL_MSG);
      }, this.handleError).
      finally(() => this.loader = false);
  }

  static toolkit() {
    if (!DataMisc._toolkit) DataMisc._toolkit = new ToolkitService;
    return DataMisc._toolkit;
  }

  onDelete(event: any) {
    if (window.confirm(DELETE_CONFIRM_MSG)) {
      return this.service.delete(event.data.id).toPromise().
        then(data => {
          this.success(data, DELETE_SUCCEFUL_MSG);
          this.floodData();
        }, this.handleError);
    }
  }

  floodData = () => {
    this.service.fetchAll().subscribe(data => this.source.load(data));
  };

  handleError = errors => {
    DataMisc._toolkit.presentErrorToast(getFirstError(errors));
    return new Promise((resolve, reject) => reject(errors));
  };

  success(data: any, msg: string) {
    DataMisc._toolkit.presentSuccessToast(msg);
    return new Promise(resolve => resolve(data));
  }

  onSave(window: any, data: any, title: string = ''): void {
    DataMisc.windowRef = this.openWindow(window, {data, isNew: !data}, title);
    this.floodData();
  }

  mergeSettings(settings: any) {
    this.settings = merge(this.settings, SETTINGS);
  }

  getCities(): City[] {
    return getCitiesFactory();
  }

  closeWindow() {
    DataMisc.windowRef.close();
  }

  openWindow(window: any, context?: any, title: string = ''): NbWindowRef {
    return this.windowService.open(window, {title, context});
  }

}
