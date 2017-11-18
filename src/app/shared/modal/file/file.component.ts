import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { Project } from '../../../shared/models/project';
import {Message} from 'primeng/components/common/api';

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

    msgs: Message[];
    
    uploadedFiles: any[] = [];

    onSelect(event) {
        for(let file of event.files) {
            //file.name=file.name+=' ' + this.project.id + ' ' + this.project.name;
            this.uploadedFiles.push(file);
        }
        console.log(event.files)
        console.log(this.uploadedFiles)
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    onUpload(event){
        //event.stopPropagation();
        console.log(event);
    }

    onError(event){
        console.log(event);
    }

}