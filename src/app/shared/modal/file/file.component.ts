import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { Error } from '../../../shared/models/error';
import {Message} from 'primeng/components/common/api';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls:  ['./file.component.less']
})
export class FileComponent extends ModalComponent {

    @Input() error:Error=new Error();



    constructor() {
        super();
    }

    msgs: Message[];
    
    uploadedFiles: any[] = [];

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        console.log(this.uploadedFiles)
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }


}