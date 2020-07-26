import { Component, OnInit } from "@angular/core";
import { NasaService } from "../nasa.service";
import { Apod } from "../apod";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: [
    "./styles/travel-listing.page.scss",
    "./styles/travel-listing.shell.scss",
  ],
})
export class HomePage implements OnInit {
  private apods: Apod[] = [];

  constructor(private nasaService: NasaService) {}

  ngOnInit() {
    this.obterApods();
  }

  obterApods() {
    this.nasaService.getApods().subscribe(
      (res: Apod[]) => {
        this.apods = res;
        console.log(this.apods[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
