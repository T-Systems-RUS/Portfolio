import { Component,ComponentFactoryResolver, Injectable, Inject, ReflectiveInjector,ViewContainerRef} from '@angular/core'
import { ErrorComponent } from '../shared/modal/error/error.component';
import { ProjectConfirmationComponent } from '../features/project/project-modal/project-confirmation/project-confirmation.component';




@Injectable()
    export class DynamicService {

    rootViewContainer:ViewContainerRef;
    factoryResolver:ComponentFactoryResolver;

    constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
        this.factoryResolver = factoryResolver
    }


    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef
    }



    addErrorComponent():ErrorComponent {
        const factory = this.factoryResolver.resolveComponentFactory(ErrorComponent)
        const component = this.rootViewContainer.createComponent(factory);
        return component.instance;
    }

    addProjectConfirmationComponent():ProjectConfirmationComponent {
        const factory = this.factoryResolver.resolveComponentFactory(ProjectConfirmationComponent)
        const component = this.rootViewContainer.createComponent(factory);
        return component.instance;
    }
}