import { Component, Input, Output,EventEmitter } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { Project } from '../../../shared/models/project';
import { FileService } from './file.service';


@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls:  ['./file.component.less']
})
export class FileComponent extends ModalComponent {

    @Input() project:Project=new Project();
    @Output() onUploaded=new EventEmitter<string>();
    @Output() onErrors=new EventEmitter<any>();

    visible=true;
    uploadedFiles: any[] = [];

    constructor(private dataService:FileService) {
        super();
    }


    ngOnInit(){
        console.log(this.project.image)
    }
    

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
        this.onUploaded.emit(event.xhr.response);
    }

    onError(event){
        this.uploadedFiles=[];
        console.log(event);
    }

    onBeforeUpload(event){
        event.formData.append('name',this.project.name);
        event.formData.append('id',this.project.id);
    }

    removeImage(){
        this.dataService.removeImage(this.project).subscribe(project=>{
            console.log(project);
        },error=>{
            this.visible=false;
            this.onErrors.emit(error);
        })
    }

}