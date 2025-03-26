import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal} from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'app-gif-history-page',
  imports: [ListComponent],
  templateUrl: './gif-history-page.component.html',
  styleUrl: './gif-history-page.component.css'
})
export default class GifHistoryPageComponent {
  // key = inject(ActivatedRoute).params.subscribe((params) => {
  //   params['key'];
  // });
  //Conversor de observables
  key = toSignal(inject(ActivatedRoute).params.pipe(map((data) => {
    return data['key'];
  })))
  gifService = inject(GifsService)
  historyData = computed(() => {
    return this.gifService.searchOnHistory(this.key());
  })
}
