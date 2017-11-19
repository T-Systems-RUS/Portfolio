import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { Project } from '../../../shared/models/project';


@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls:  ['./file.component.less']
})
export class FileComponent extends ModalComponent {

    @Input() project:Project=new Project();



    constructor() {
        super();
    }


    
    uploadedFiles: any[] = [];

    onSelect(event) {
        
        for(let file of event.files) {
            //file.name=file.name+=' ' + this.project.id + ' ' + this.project.name;
            this.uploadedFiles.push(file);
        }
        console.log(event.files)
        console.log(this.uploadedFiles);
    }

    onUpload(event){
        //event.stopPropagation();
        this.uploadedFiles=[];
        console.log(event.xhr.response);
    }

    onError(event){
        this.uploadedFiles=[];
        console.log(event);
    }

    onBeforeUpload(event){
        event.formData.append('name',this.project.name);
        event.formData.append('id',this.project.id);
    }

}