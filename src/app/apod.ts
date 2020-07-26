export class Apod {
  date: string;
  explanation: string;
  imagesource: string;
  url: string;
  hdurl: string;
  media_type: string;
  copyright: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
