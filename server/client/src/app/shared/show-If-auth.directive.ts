import {
  Directive,  Input,
  TemplateRef, ViewContainerRef,
} from '@angular/core';


@Directive({ selector: '[showIfAuth]' })
export class ShowIfAuthDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set showIfAuth(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
