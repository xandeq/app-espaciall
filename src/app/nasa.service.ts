import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Apod } from "./apod";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NasaService {
  API_KEY = "BzCHxf3K4h1enx5cUDETYFuGaexAd9NaOib69ZKy";
  baseurl = "https://api.nasa.gov/planetary/apod?api_key=" + this.API_KEY;

  constructor(private httpClient: HttpClient) {}

  public getApods(): Observable<Apod[]> {
    return this.httpClient
      .get<Apod[]>(
        this.baseurl +
          "&start_date=" +
          this.getEndDate() +
          "&end_date=" +
          this.getStartDate()
      )
      .pipe(
        map((res) => res.map((apod) => new Apod(apod))),
        catchError((err) => {
          throw "error in source. Details: " + err;
        })
      );
  }

  getStartDate(): string {
    const today = new Date();
    return this.formatDate(today);
  }

  getEndDate(): string {
    const today = new Date();
    const tenDaysBefore = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 10
    );
    return this.formatDate(tenDaysBefore);
  }

  formatDate(date): string {
    let dd = date.getDate();
    let MM = date.getMonth();
    const yyyy = date.getFullYear();
    dd = dd < 10 ? `0${dd}` : dd;
    MM = MM < 10 ? `0${MM}` : MM;
    return `${yyyy}-${MM}-${dd}`;
  }
}
