import axios from 'axios';
import PptxGenJS from 'pptxgenjs';
import {IProject} from '../../../shared/interfaces/IProject';
import {ITechnology} from '../../../shared/interfaces/ITechnology';

interface ISlide {
  addText(text: string, params: {}): void

  addImage(params: {}): void

  addShape(type: string, shape: {}): void
}

interface IPptx {

  shapes: { RECTANGLE: string }

  setBrowser(param: boolean): void

  setLayout(param: string): void

  save(param: string): void

  addNewSlide(): ISlide
}

interface IPresentationResponse {
  header: string;
  header2: string;
  domain: string;
  image: string;
  technologies: ITechnology[];
}

// Constants
const HEADLINE_FONT = 'TELEGROTESK HEADLINE ULTRA';
const NORMAL_FONT = 'Tele-GroteskNor';

const MAGENTA = 'e20074';
const WHITE = 'ffffff';
const GRAY = '7f7f7f';
const LIGHT_GRAY = 'a4a4a4';
const BLACK = '000000';
// default padding from left
const X = 0.39;

let pptx: IPptx | null = null;

export class PowerPointService {
  static createProjectPresentation(project: IProject) {
    this.newPresentation();

    this.addProjectSlide(project)
      .then(() => this.generatePresentation());
  }

  static createProjectsPresentation(projects: IProject[]) {
    this.newPresentation();

    const promises: Promise<void>[] = [];
    projects.forEach(project => {
      promises.push(this.addProjectSlide(project));
    });

    Promise.all(promises)
      .then(() => this.generatePresentation());
  }

  private static newPresentation() {
    pptx = new PptxGenJS();

    pptx!.setBrowser(true);
    pptx!.setLayout('LAYOUT_4x3');
  }

  private static generatePresentation() {
    pptx!.save(`POP Russia Portfolio ${name}`);
    pptx = null;
  }

  private static addProjectSlide(project: IProject) {
    return axios.get<IPresentationResponse>(`/api/presentation/images/${project.id}`)
      .then(response => {
        const header = response.data.header;
        const header2 = response.data.header2;
        const domain = response.data.domain;
        const image = response.data.image;
        const technologies = response.data.technologies;

        const slide = pptx!.addNewSlide();

        this.addImage(slide, header, 0, 0, '100%', 0.5);
        this.addImage(slide, header2, 0, 0, '100%', 0.5);
        if (domain) {
          this.addImage(slide, domain, '92%', 0.05, 0.45, 0.45);
        }

        this.addText(slide, project.name, X, 0, HEADLINE_FONT, 28, GRAY);
        this.addText(slide, 'Description of Project', X, 0.6, HEADLINE_FONT, 18, MAGENTA);
        this.addText(slide, project.description, X, 1.0, NORMAL_FONT, 14, BLACK, false, 'top');

        if (image) {
          this.addImage(slide, image, '60%', 1.1, 3.2, 1.9);
        }

        slide.addShape(pptx!.shapes.RECTANGLE, {x: 0.0, y: 5.5, w: '50%', h: 2.0, fill: MAGENTA});
        slide.addShape(pptx!.shapes.RECTANGLE, {x: '50%', y: 5.5, w: '50%', h: 2.0, fill: LIGHT_GRAY});

        this.addText(slide, 'Details', X, 5.45, HEADLINE_FONT, 18);

        const start = 5.75;
        const lineheight = 0.25;

        this.addText(slide, 'Project duration:', X, start, NORMAL_FONT, 18);
        this.addText(slide,
          this.getDate(project.startdate) + (project.enddate ? ` - ${this.getDate(project.enddate)}` : ''),
          1.9, start, NORMAL_FONT, 18, WHITE, true);

        const programY = start + lineheight;
        this.addText(slide, 'Program:', X, programY, NORMAL_FONT, 18);
        this.addText(slide, project.program.name, 1.3, programY, NORMAL_FONT, 18, WHITE, true);

        const domainY = start + (lineheight * 2);
        this.addText(slide, 'Domain:', X, domainY, NORMAL_FONT, 18);
        this.addText(slide, project.domain.name, 1.3, domainY, NORMAL_FONT, 18, WHITE, true);

        let interval = 0;
        const language = project.technologies.filter(tech => tech.domain === 'language');
        if (language.length) {
          interval += 0.25;
          const text = language.map(item => item.name).join(' ');

          const languageY = start + (lineheight * 3);
          this.addText(slide, 'Language:', X, languageY, NORMAL_FONT, 18);
          this.addText(slide, text, 1.4, languageY, NORMAL_FONT, 18, WHITE, true);
        }

        const methodology = project.technologies.filter(tech => tech.domain === 'methodology');
        if (methodology.length) {
          const text = methodology.map(item => item.name).join(' ');

          const methodologyY = start + (lineheight * 3) + interval;
          this.addText(slide, 'Methodology:', X, methodologyY, NORMAL_FONT, 18);
          this.addText(slide, text, 1.7, methodologyY, NORMAL_FONT, 18, WHITE, true);
        }

        const backend = technologies.filter(item => item.domain === 'backend');
        const frontend = technologies.filter(item => item.domain === 'frontend');

        let headerY = 5.45;
        let iconY = 5.9;
        let textY = 6.1;

        if (backend.length) {
          this.addText(slide, 'Back-end', 5.1, headerY, HEADLINE_FONT, 18);

          let bside = 5.2;
          let bsidetext = 5.1;
          backend.forEach(item => {
            this.addImage(slide, item.image, bside, iconY, 0.4, 0.3);
            this.addText(slide, item.name, bsidetext, textY);

            bside += 0.7;
            bsidetext += 0.7;
          });

          headerY += 0.95;
          iconY += 0.95;
          textY += 0.95;
        }

        if (frontend.length) {
          this.addText(slide, 'Front-end', 5.1, headerY, HEADLINE_FONT, 18);

          let bside = 5.2;
          let bsidetext = 5.1;

          frontend.forEach(item => {
            this.addImage(slide, item.image, bside, iconY, 0.4, 0.3);
            this.addText(slide, item.name, bsidetext, textY);

            bside += 0.7;
            bsidetext += 0.7;
          });
        }
      });
  }

  private static addText(slide: ISlide, text: string, x: number, y: number, fontFace = NORMAL_FONT, fontSize = 14,
    color = WHITE, underline = false, valign = 'middle') {
    slide.addText(text, {
      x,
      y,
      w: '50%',
      h: 0.5,
      align: 'l',
      valign,
      fontSize,
      fontFace,
      color,
      underline
    });
  }

  private static addImage(slide: ISlide, imageBase64: string, x: number | string, y: number, w: number | string,
    h: number) {
    slide.addImage({data: `image/png;base64,${imageBase64}`, x, y, w, h});
  }

  private static getDate(date: string) {
    const newDate = new Date(date);
    return `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`;
  }
}
