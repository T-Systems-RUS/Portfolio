import {ComponentFactoryResolver, Injectable, Inject, ViewContainerRef} from '@angular/core';
import {DeleteComponent} from '../shared/modal/delete/delete.component';
import {ErrorComponent} from '../shared/modal/error/error.component';
import {FileComponent} from '../shared/modal/file/file.component';
import {ProjectConfirmationComponent} from '../features/project/project-modal/project-confirmation/project-confirmation.component';

@Injectable()
export class DynamicService {

  rootViewContainer: ViewContainerRef;
  factoryResolver: ComponentFactoryResolver;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addDeleteComponent(): DeleteComponent {
    const factory = this.factoryResolver.resolveComponentFactory(DeleteComponent);
    const component = this.rootViewContainer.createComponent(factory);
    return component.instance;
  }

  addFileComponent(): FileComponent {
    const factory = this.factoryResolver.resolveComponentFactory(FileComponent);
    const component = this.rootViewContainer.createComponent(factory);
    return component.instance;
  }

  addErrorComponent(): ErrorComponent {
    const factory = this.factoryResolver.resolveComponentFactory(ErrorComponent);
    const component = this.rootViewContainer.createComponent(factory);
    return component.instance;
  }

  addProjectConfirmationComponent(): ProjectConfirmationComponent {
    const factory = this.factoryResolver.resolveComponentFactory(ProjectConfirmationComponent);
    const component = this.rootViewContainer.createComponent(factory);
    return component.instance;
  }
}
