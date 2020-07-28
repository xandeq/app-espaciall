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
    const hoje: Date = new Date();
    const inicio =
      hoje.getFullYear() + "-" + (hoje.getMonth() + 1) + "-" + hoje.getDate();
    console.log(this.baseurl + "&date=" + inicio);
    return this.httpClient.get<Apod[]>(this.baseurl + "&date=" + inicio).pipe(
      map((res) => res.map((apod) => new Apod(apod))),
      catchError((err) => {
        throw "error in source. Details: " + err;
      })
    );
  }

  randomDate(date1, date2) {
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    var date1 = date1 || "01-01-1970";
    var date2 = date2 || new Date().toLocaleDateString();
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();
    if (date1 > date2) {
      return new Date(randomValueBetween(date2, date1)).toLocaleDateString();
    } else {
      return new Date(randomValueBetween(date1, date2)).toLocaleDateString();
    }
  }
}
