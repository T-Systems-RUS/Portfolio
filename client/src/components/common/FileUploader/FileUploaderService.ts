import {FileUploadStatus, IFileUpload, IImageUrl} from './IFileUploadList';
import axios from 'axios';
import Guid from '../../../shared/classes/Guid';

const harmfulFileExtensionRegex = new RegExp('(.|/)(bat|exe|cmd|sh|php([0-9])?|pl|cgi|' +
  '386|dll|com|torrent|js|app|jar|pif|vb|vbscript|wsf|asp|cer|csr|jsp|drv|sys|ade|adp|bas|chm' +
  '|cpl|crt|csh|fxp|hlp|hta|inf|ins|isp|jse|htaccess|htpasswd|ksh|lnk|mdb|mde|mdt|mdw' +
  '|msc|msi|msp|mst|ops|pcd|prg|reg|scr|sct|shb|shs|url|vbe|vbs|wsc|wsf|wsh)$');
const imageFileExtesionRegex = /\.(jpg|jpeg|png)$/;

export class FileUploaderService {
  public static fileListToFileUploadList(fileList: FileList): IFileUpload[] {
    return Array.prototype.map.call(fileList, (item: File) => FileUploaderService.fileToFileUpload(item));
  }

  public static fileToFileUpload(file: File): IFileUpload {
    return {
      file,
      loadingStatus: FileUploadStatus.NULL,
      imageDataUrl: ''
    };
  }

  public static isFileInUploadList(file: File, fileUploadList: IFileUpload[]): boolean {
    return fileUploadList.some((item: IFileUpload) => item.file.name === file.name);
  }

  public static getFileNameFromUrl(url: string): string {
    return url.split('/').slice(-1)[0];
  }

  public static urlToImageUrl(url: string): IImageUrl {
    return {
      url,
      name: FileUploaderService.getFileNameFromUrl(url),
      loadingStatus: FileUploadStatus.NULL
    };
  }

  // TODO: should be removed when API is working
  public static fakeUploadFiles(): Promise<boolean> {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 2000));
  }

  public static uploadFiles(file: IFileUpload) {
    const fileExtension = file.file.type.replace(/^[^/]*[/]/, '');

    return axios.post('/api/images/add/', {
      'data': file.imageDataUrl,
      'name': `${Guid.newGuid()}.${fileExtension}`,
      'type': fileExtension
    });
  }

  public static validateFileSize(file: File, maxSize: number): boolean {
    return file.size <= maxSize;
  }

  public static validateFileExtension(fileName: string): boolean {
    return !harmfulFileExtensionRegex.test(fileName);
  }

  public static validateImageExtension(fileName: string): boolean {
    return imageFileExtesionRegex.test(fileName);
  }
}
