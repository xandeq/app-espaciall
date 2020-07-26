import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Apod } from "./apod";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NasaService {
  baseurl =
    "https://api.nasa.gov/planetary/apod?api_key=BzCHxf3K4h1enx5cUDETYFuGaexAd9NaOib69ZKy&start_date=2020-02-10&end_date=2020-02-15";

  constructor(private httpClient: HttpClient) {}

  // getApod() {
  //   return this.httpClient.get(this.baseurl);
  // }

  public getApods(): Observable<Apod[]> {
    return this.httpClient.get<Apod[]>(this.baseurl).pipe(
      map((res) => res.map((apod) => new Apod(apod))),
      catchError((err) => {
        throw "error in source. Details: " + err;
      })
    );
  }
}