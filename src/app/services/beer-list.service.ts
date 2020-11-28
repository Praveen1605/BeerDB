import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BeerListConstants } from '../constants/beer-list.constants';
import { IBeerDetails } from '../model/beer-details.model';
import { catchError,tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class BeerListService{
    public beerDetails: Array<IBeerDetails> = Object.assign([]);
    public loading: boolean = false;
    public totalRecords: number = 0;
    constructor(private http: HttpClient){

    }

    public init(){
        this.loading = true;
        this.callBeerCraftApi().subscribe(response=>{
            console.log("Response After callBeerCraftApi %o", response);
            this.callBeerImagesApi().subscribe(response=>{
                console.log("Response After callBeerImagesApi %o", response);
                this.loading = false;
                this.totalRecords = this.beerDetails.length;
            })
        })
    }

    public callBeerCraftApi(){
        return this.http.get<any>(BeerListConstants.beerCraftApi, {}).pipe(tap(apiResponse=>{
            console.log("Response from BeerCraftAPI %o", apiResponse);
            apiResponse.forEach(element => {
                this.beerDetails.push(element);
            });
        }));
    }

    public callBeerImagesApi(){
        return this.http.get<any>(BeerListConstants.beerImageApi, {}).pipe(tap(apiResponse=>{
            console.log("beerDetails before BeerImageAPI %o", apiResponse);
            console.log("Response from BeerImageAPI %o", apiResponse);
            let tempValue = 0;
            this.beerDetails.forEach(element => {
                element.image = apiResponse[tempValue].image;
                if(apiResponse && apiResponse.length > 0 && tempValue<apiResponse.length-1){
                    ++tempValue;
                } else {
                    tempValue = 0;
                }
            });
        }));
    }
}