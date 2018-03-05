import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { Project } from '../../../shared/models/project';
import { FileService } from '../../../core/file.service';

/**
 * Modal window for project image upload
 * @export
 * @class FileComponent
 * @extends {ModalComponent}
 */
@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls:  ['./file.component.scss']
})
export class FileComponent extends ModalComponent {

    @Input() project: Project = new Project();
    @Output() onUploaded = new EventEmitter<string>();
    @Output() onErrors = new EventEmitter<{}>();

    visible = true;
    uploadedFiles: {}[] = [];

    constructor(private dataService: FileService) {
        super();
    }

    /**
    * Prime Ng File Upload events
    * @param {any} event 
    * @memberof FileComponent
    */
    onSelect(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    onUpload(event) {
        this.uploadedFiles = [];
        this.onUploaded.emit(event.xhr.response);
    }

    onClear(event) {
        this.uploadedFiles = [];
    }

    onError(event) {
        this.uploadedFiles = [];
        console.log(event);
    }

    /**
     * Appends params before send
     * to server
     * @param {any} event
     * @memberof FileComponent
     */
    onBeforeUpload(event) {
        event.formData.append('name', this.project.name);
        event.formData.append('id', this.project.id);
    }

    removeImage() {
        this.dataService.removeImage(this.project).subscribe(project => {
            this.project.image = null;
            this.visible = false;
        }, error => {
            this.visible = false;
            this.onErrors.emit(error);
        });
    }

}
