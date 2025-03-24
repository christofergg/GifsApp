import { GiphyDTOMapper } from './../mapper/giphyDTO.mapper';
import { GiphyDTO } from './../interfaces/giphyDTO.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient);

  trendingGifs = signal<GiphyDTO[]>([])
  trendingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
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
      })
    );
  }
}
