import { GiphyItem } from './../interfaces/giphy.interfaces';
import { GiphyDTO } from "../interfaces/giphyDTO.interface";

export class GiphyDTOMapper {
  static mapGiphyItemToGiphyDTO(gItem: GiphyItem) : GiphyDTO {
    return {
      id: gItem.id,
      title: gItem.title,
      url: gItem.images.original.url
    }
  }
  static mapGiphyItemToGiphyDTOArray(gItems : GiphyItem[]) : GiphyDTO[] {
    return gItems.map(this.mapGiphyItemToGiphyDTO);
  }
}
