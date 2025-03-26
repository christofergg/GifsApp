import { GiphyDTOMapper } from './../mapper/giphyDTO.mapper';
import { GiphyDTO } from './../interfaces/giphyDTO.interface';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { map, Observable, tap } from 'rxjs';

function loadFromLocalStorage() : Record<string, GiphyDTO[]> {
  const hist = localStorage.getItem(`GiphyHistory`);
  //FALTAN VALIDACIONES DE JSON INJECTION
  return hist ? JSON.parse(hist) : ({});
}

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<GiphyDTO[]>([])
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, GiphyDTO[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  saveToLocalStorage = effect( () => {
    localStorage.setItem(`GiphyHistory`, JSON.stringify(this.searchHistory()))
  })
  constructor() {
    this.loadTrendingGifs();
    this.searchHistory.set(loadFromLocalStorage());
   }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${ environment.giphyServiceUrl }/trending`, {
      params: {
        api_key: environment.giphyApiToken,
        limit: 25
      }
    }).subscribe((response) => {
      const gifs = GiphyDTOMapper.mapGiphyItemToGiphyDTOArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log({gifs});
    });
  }
  searchOnHistory(key : string) {
    return this.searchHistory()[key] ?? [];
  }
  searchByQueryGifs(query : string) {
    return this.http.get<GiphyResponse>(`${environment.giphyServiceUrl}/search`, {
      params: {
        api_key: environment.giphyApiToken,
        q: query,
        limit: 25
      }
    })
    .pipe(
      tap((response) => {

        console.log( { response } )
      }),
      map( ({ data }) => {
        return GiphyDTOMapper.mapGiphyItemToGiphyDTOArray(data);
      }),
      tap((data) => {
        this.searchHistory.update((hist) => {
          return {
            ...hist,
            [query.toLowerCase()] : data
          }
        })
      })
    );
  }
}
