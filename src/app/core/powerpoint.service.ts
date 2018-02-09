import {Injectable} from '@angular/core';

import {Project} from '../shared/models/project';
import {HttpService} from './http.service';
import {ExtractService} from './extract.service';
import {Observable} from 'rxjs/Observable';

import {Routes} from './../shared/helpers/routes';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import pptx from 'pptxgenjs';

@Injectable()
export class PowerPointService {

  routes: Routes;
  pptx;

  constructor(private http: HttpService, private extract: ExtractService) {
    this.routes = new Routes();

    this.createInstance();
  }

  magenta = 'e20074';
  x = 0.39;

  capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  getDate(date: Date) {
    const newDate = date ? new Date(date) : null;
    const parsed = newDate ? newDate.getDate() + '.' + newDate.getMonth() + '.' + newDate.getFullYear() : '';
    return parsed;
  }

  addSlide(project: Project) {

  }

  createPresentation(project: Project, name = '', saveToClient = false) {
    return this.http.get(this.routes.presentationImages + project.id)
      .subscribe(res => {

          const response = res.json();
          const header = response.header;
          const header2 = response.header2;
          const domain = response.domain;
          const image = response.image;
          const technologies = response.technologies;

          //  let PptxGenJS=Object.getPrototypeOf(pptx).constructor;
          //  let presentation=new PptxGenJS();

          this.pptx.setBrowser(true);

          this.pptx.setLayout('LAYOUT_4x3');

          const slide = this.pptx.addNewSlide();

          // header
          slide.addImage(
            {data: 'image/png;base64,' + header, x: 0.0, y: 0.0, w: '100%', h: '0.5'}
          );

          slide.addImage(
            {data: 'image/png;base64,' + header2, x: 0.0, y: 0.0, w: '100%', h: '0.5'}
          );

          if (domain) {
            slide.addImage(
              {data: 'image/png;base64,' + domain, x: '92%', y: '0.05', w: '0.45', h: '0.45'}
            );
          }

          slide.addText(
            project.name,
            {
              x: this.x,
              y: 0.0,
              w: '100%',
              h: 0.5,
              align: 'l',
              valign: 'middle',
              font_size: 28,
              font_face: 'TELEGROTESK HEADLINE ULTRA',
              color: '7F7F7F'
            }
          );

          slide.addText(
            'Description of Project',
            {
              x: this.x,
              y: 0.6,
              w: '50%',
              h: 0.5,
              align: 'l',
              valign: 'middle',
              font_size: 18,
              font_face: 'TELEGROTESK HEADLINE ULTRA',
              color: this.magenta
            }
          );

          slide.addText(
            project.description,
            {x: this.x, y: 1.0, w: '50%', h: 1.0, align: 'l', valign: 'top', font_size: 14, font_face: 'Tele-GroteskNor', color: '000000'}
          );

          if (image) {
            slide.addImage(
              {data: 'image/png;base64,' + image, x: '60%', y: 1.1, w: 3.2, h: 1.9}
            );
          }

          // y = 3.625 for 16_9
          slide.addShape(this.pptx.shapes.RECTANGLE, {x: 0.0, y: 5.5, w: '50%', h: 2.0, fill: this.magenta});
          slide.addShape(this.pptx.shapes.RECTANGLE, {x: '50%', y: 5.5, w: '50%', h: 2.0, fill: 'a4a4a4'});

          //
          slide.addText(
            'Details',
            {
              x: this.x,
              y: 5.45,
              w: '50%',
              h: 0.5,
              align: 'l',
              valign: 'middle',
              font_size: 18,
              font_face: 'TELEGROTESK HEADLINE ULTRA',
              color: 'ffffff'
            }
          );

          // y=3.9
          // duration
          const start = 5.75;
          const lineheight = 0.25;
          slide.addText(
            'Project duration:',
            {
              x: this.x,
              y: start,
              w: '50%',
              h: 0.5,
              align: 'l',
              valign: 'middle',
              font_size: 18,
              font_face: 'Tele-GroteskNor',
              color: 'ffffff'
            }
          );

          slide.addText(
            this.getDate(project.startdate) +
            (project.enddate ? '-' : '')
            + this.getDate(project.enddate),
            {
              x: 1.9,
              y: start,
              w: '50%',
              h: 0.5,
              align: 'l',
              valign: 'middle',
              underline: true,
              font_size: 18,
              font_face: 'Tele-GroteskNor',
              color: 'ffffff'
            }
          );

          // program
          slide.addText(
            'Program:',
            {
              x: this.x,
              y: start + (lineheight),
              w: '50%',
              h: 0.5,
              align: 'l',
              valign: 'middle',
              font_size: 18,
              font_face: 'Tele-GroteskNor',
              color: 'ffffff'
            }
          );

          slide.addText(
            project.program,
            {
              x: 1.3,
              y: start + (lineheight),
              w: '50%',
              h: 0.5,
              align: 'l',
              valign: 'middle',
              underline: true,
              font_size: 18,
              font_face: 'Tele-GroteskNor',
              color: 'ffffff'
            }
          );

          // domain
          slide.addText(
            'Domain:',
            {
              x: this.x,
              y: start + (lineheight * 2),
              w: '50%',
              h: 0.5,
              align: 'l',
              valign: 'middle',
              font_size: 18,
              font_face: 'Tele-GroteskNor',
              color: 'ffffff'
            }
          );

          slide.addText(
            project.domain,
            {
              x: 1.3,
              y: start + (lineheight * 2),
              w: '50%',
              h: 0.5,
              align: 'l',
              valign: 'middle',
              underline: true,
              font_size: 18,
              font_face: 'Tele-GroteskNor',
              color: 'ffffff'
            }
          );

          // Language
          let interval = 0;
          const language = project.technologies.filter(tech => tech.domain === 'language');
          if (language.length) {
            interval += 0.25;
            const text = language.map(item => item.name).join(' ');
            slide.addText(
              'Language:',
              {
                x: this.x,
                y: start + (lineheight * 3),
                w: '50%',
                h: 0.5,
                align: 'l',
                valign: 'middle',
                font_size: 18,
                font_face: 'Tele-GroteskNor',
                color: 'ffffff'
              }
            );

            slide.addText(
              text,
              {
                x: 1.4,
                y: start + (lineheight * 3),
                w: '50%',
                h: 0.5,
                align: 'l',
                valign: 'middle',
                underline: true,
                font_size: 18,
                font_face: 'Tele-GroteskNor',
                color: 'ffffff'
              }
            );
          }

          // Methology
          const methodology = project.technologies.filter(tech => tech.domain === 'methodology');
          if (methodology.length) {
            const text = methodology.map(item => item.name).join(' ');
            slide.addText(
              'Methodology:',
              {
                x: this.x,
                y: start + (lineheight * 3) + interval,
                w: '50%',
                h: 0.5,
                align: 'l',
                valign: 'middle',
                font_size: 18,
                font_face: 'Tele-GroteskNor',
                color: 'ffffff'
              }
            );

            slide.addText(
              text,
              {
                x: 1.7,
                y: start + (lineheight * 3) + interval,
                w: '50%',
                h: 0.5,
                align: 'l',
                valign: 'middle',
                underline: true,
                font_size: 18,
                font_face: 'Tele-GroteskNor',
                color: 'ffffff'
              }
            );
          }

          const backend = technologies.filter(item => item.domain === 'backend');
          const frontend = technologies.filter(item => item.domain === 'frontend');

          let headerY = 5.45;
          let iconY = 5.9;
          let textY = 6.1;

          if (backend.length) {
            slide.addText(
              'Back-end',
              {
                x: 5.1,
                y: headerY,
                w: '50%',
                h: 0.5,
                align: 'l',
                valign: 'middle',
                font_size: 18,
                font_face: 'TELEGROTESK HEADLINE ULTRA',
                color: 'ffffff'
              }
            );

            let bside = 5.2;
            let bsidetext = 5.1;
            for (const item of backend) {
              slide.addImage(
                {data: 'image/png;base64,' + item.image, x: bside, y: iconY, w: 0.4, h: 0.3}
              );

              slide.addText(
                item.name,
                {
                  x: bsidetext,
                  y: textY,
                  w: '50%',
                  h: 0.5,
                  align: 'l',
                  valign: 'middle',
                  font_size: 14,
                  font_face: 'Tele-GroteskNor',
                  color: 'ffffff'
                }
              );

              bside += 0.7;
              bsidetext += 0.7;
            }

            headerY += 0.95;
            iconY += 0.95;
            textY += 0.95;
          }

          if (frontend.length) {
            slide.addText(
              'Front-end',
              {
                x: 5.1,
                y: headerY,
                w: '50%',
                h: 0.5,
                align: 'l',
                valign: 'middle',
                font_size: 18,
                font_face: 'TELEGROTESK HEADLINE ULTRA',
                color: 'ffffff'
              }
            );

            let bside = 5.2;
            let bsidetext = 5.1;
            for (const item of frontend) {
              slide.addImage(
                {data: 'image/png;base64,' + item.image, x: bside, y: iconY, w: 0.4, h: 0.3}
              );

              slide.addText(
                item.name,
                {
                  x: bsidetext,
                  y: textY,
                  w: '50%',
                  h: 0.5,
                  align: 'l',
                  valign: 'middle',
                  font_size: 14,
                  font_face: 'Tele-GroteskNor',
                  color: 'ffffff'
                }
              );

              bside += 0.7;
              bsidetext += 0.7;
            }
          }

          if (saveToClient) {
            this.pptx.save('POP Russia Portfolio ' + name);

          }

        },
        error => {
          console.log(error);
          Observable.throw(this.extract.handlePostError(error));
        }
      );
  }

  private createInstance() {
    const PptxGenJS = Object.getPrototypeOf(pptx).constructor;
    this.pptx = new PptxGenJS();
  }
}
