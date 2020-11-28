import { Component, OnInit } from '@angular/core';
import { IBeerDetails } from '../model/beer-details.model';
import { BeerListService } from '../services/beer-list.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(private beerListService: BeerListService) { }

  public ngOnInit(): void {
    this.beerListService.init();
  }

  get beerDetails(): Array<IBeerDetails> {
    return this.beerListService.beerDetails;
  }

  get loading(): boolean {
    return this.beerListService.loading;
  }
}
