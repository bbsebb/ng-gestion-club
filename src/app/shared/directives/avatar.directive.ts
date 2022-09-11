import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[avatar]'
})
export class AvatarDirective implements AfterViewInit{


  @Input() src:string | null = null;
  @Input() alt?:string;


  constructor(private el:ElementRef, private renderer:Renderer2) { }

  ngAfterViewInit() {
    if(this.src) {

    const vignette = this.renderer.createElement('div');

    const children = [...this.el.nativeElement.children];

    this.el.nativeElement.innerHTML ='';
      //this.renderer.setProperty(this.el.nativeElement,'innerHTML','Test2');
     this.renderer.addClass(vignette,'vignette');

     this.src = `url("${this.src}")`;
    this.renderer.setStyle(vignette, 'background-image', this.src);

    this.renderer.setStyle(this.el.nativeElement,'display','flex');
    this.renderer.setStyle(this.el.nativeElement,'align-items','center');

    this.renderer.appendChild(this.el.nativeElement,vignette);
    for (const child of children) {
      this.renderer.appendChild(this.el.nativeElement,child);
    }


  }
  }

  setBackgroundImage(src: string) {
    src = `url("${src}")`;
    this.renderer.setStyle(this.el.nativeElement, 'background-image', src);
  }

}
