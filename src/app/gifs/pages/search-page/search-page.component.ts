import { Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifsService } from '../../services/gifs.service';
import { GiphyDTO } from '../../interfaces/giphyDTO.interface';

@Component({
  selector: 'app-search-page',
  imports: [ListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export default class SearchPageComponent {
  gifService = inject(GifsService);
  gifsFound = signal<GiphyDTO[]>([]);

  onSearch(query : string) {
    this.gifService.searchByQueryGifs(query)
        .subscribe((response) => {
       this.gifsFound.set(response);
    })
    console.log({ query });
  }
}
