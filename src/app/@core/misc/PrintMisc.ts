import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { CommonService } from '@app/@core/services';
import { formatMoney } from '@app/@core/helpers';
import * as moment from 'moment';

export interface CellInterface {
  text: any;
  x?: number,
  y?: number,
  width?: number;
  height?: number;
  font_size?: number;
  font_style?: string;
  align?: string;
}

export interface CellOptions {
  height?: number,
  font_size?: number;
  font_style?: string;
  align?: string;
}

export class PrintMisc implements OnInit, OnDestroy {
  toCash = formatMoney;
  private _subscription: Subscription;
  protected commonService: CommonService;
  marX = 15;
  pdf: any;
  private _x = 20;
  private _y = 0;

  constructor() {
    moment.locale('es');
  }

  settings(title: string) {
    this.pdf.setProperties({
      title,
      author: 'Inverbienes',
      creator: 'Inverbienes'
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this._subscription = this.commonService.notifier.subscribe(action => {
      if (action == 'close') {
        const el = document.getElementsByTagName('iframe')[0];
        document.body.removeChild(el);
      }
    });
  }

  expose(data: any) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('style', 'position:fixed; top:65px;bottom:0;right:0;left:0; height:calc(100% - 65px); width:100%;z-index:99');
    document.body.appendChild(iframe);
    document.body.style.overflowY = 'hidden';
    iframe.src = data;
    this.commonService.notifyHeader();
  }

  cell(x: number, y: number, w: number, h: number, text: string = '', align: string = 'L') {
    const xfactor = this._getFactor(align, text, w);
    this.pdf.cell(x, y, w, h, ' ');
    this.pdf.text(text, x + xfactor, y + (h / 2) + 1);
  }

  text(text: string = '', x: number, y: number, align: string = 'L') {
    const xfactor = this._getFactor(align, text, 200);
    this.pdf.text(text, x + xfactor, y);
  }

  private _getFactor(align: string, text: string, w: number) {
    const textWidth = this.pdf.getStringUnitWidth(text) * this.pdf.internal.getFontSize() / this.pdf.internal.scaleFactor;
    switch (align) {
      case 'L':
        return 2;
      case 'R':
        return w - textWidth - 2;
      case 'C':
        return (w - textWidth) / 2;
    }
  }

  row(cells: CellInterface[], opts: CellOptions = {}) {
    const h = 6, w = 180 - cells.reduce((a, b) => (b.width || 0) + a, 0),
      amt = cells.filter(c => !c.width).length;
    cells.forEach(c => {
      this.setFont(c.font_size || opts.font_size || 10, c.font_style || opts.font_style || 'normal');
      this.cell(c.x || this._x, c.y || this._y, c.width || (w / amt), c.height || opts.height || h,
        c.text, c.align || opts.align || 'L');
      this._x += c.width || (w / amt);
    });
  }

  setFont(size: number, style: string = 'normal') {
    this.pdf.setFontStyle(style);
    this.pdf.setFontSize(size);
  }

  setXY(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  multiline(paragraph: string, x: number, y: number) {
    const lMargin = 15; //left margin in mm
    const rMargin = 15; //right margin in mm
    const pdfInMM = 210;  // width of A4 in mm

    const lines = this.pdf.splitTextToSize(paragraph, (pdfInMM - lMargin - rMargin));
    const dim = this.pdf.getTextDimensions('Text');
    const lineHeight = dim.h + 5;
    for (let i = 0; i < lines.length; i++)
      this.pdf.text(lines[i], x, y + (lineHeight / 2) * i, 'justify');
  }
}
