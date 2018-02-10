import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { Project } from '../../../shared/models/project';
import { FileService } from '../../../core/file.service';

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

    onSelect(event) {

        for (const file of event.files) {
            // file.name=file.name+=' ' + this.project.id + ' ' + this.project.name;
            this.uploadedFiles.push(file);
        }
        console.log(event.files);
        console.log(this.uploadedFiles);
    }

    onUpload(event) {
        // event.stopPropagation();
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

    onBeforeUpload(event) {
        event.formData.append('name', this.project.name);
        event.formData.append('id', this.project.id);
    }

    removeImage() {
        this.dataService.removeImage(this.project).subscribe(project => {
            this.project.image = null;
            this.visible = false;
            console.log(project);
        }, error => {
            this.visible = false;
            this.onErrors.emit(error);
        });
    }

}
