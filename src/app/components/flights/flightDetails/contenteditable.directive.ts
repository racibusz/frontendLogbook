import { Directive, ElementRef, HostListener, Input, Signal, effect } from '@angular/core';

@Directive({
  selector: '[contenteditableField]',
  standalone: true
})
export class ContenteditableFieldDirective {

  @Input({ required: true }) contenteditableChanges!: Signal<any>;

  @Input({ required: true }) contenteditableField!: string;

  @Input({ required: false}) format!: string;

constructor(private el: ElementRef<HTMLElement>) {

}

  

  @HostListener('input')
  onInput() {
    const obj = this.contenteditableChanges();
    if (!obj) return;
    const keys = this.contenteditableField.split('.');
    let ref = obj;
    for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];

    let value = this.el.nativeElement.innerText.trim();
    if (this.format) {
      if(this.format == "UPPERCASE"){
        value = value.toUpperCase();
      }
      else{
        const regex = new RegExp(this.format, 'g');
        let matches = value.match(regex);
        let valueToSet = matches ? matches.join('') : '';
        if(matches == null){
          value = value.slice(0, -1);
        }
        else{
          value = valueToSet;
        }
        const typing = ref[keys[keys.length-1]].length<value.length
        if(typing && (value.length==4 || value.length == 7) && keys[keys.length-1].endsWith('Date')){
          value+="-";
        }
        if(typing && (value.length==2) && keys[keys.length-1].endsWith('Time')){
          value+=":";
        }
      }
      this.el.nativeElement.innerText = value;
      this.setCaretToEnd();
    }


      ref[keys[keys.length - 1]] = value;
  }
  private setCaretToEnd() {
    const el = this.el.nativeElement;
    const range = document.createRange();
    const sel = window.getSelection();
    if (!sel) return;
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
