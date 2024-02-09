import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Giphy from 'giphy-api';
import {AppConfig} from '../../../config/config.service';



@Component({
  selector: 'app-select-giphy',
  templateUrl: './select-giphy.component.html',
  styleUrls: ['./select-giphy.component.css']
})
export class SelectGiphyComponent implements OnInit {
  @Input() stickers = false;
  @Output() selectGiphy = new EventEmitter<any>();
  giphyKey = AppConfig.settings.giphyKey;
  giphy = Giphy({apiKey: this.giphyKey, https: true});
  giphySearchTerm = '';
  giphyResults = [];
  loading = false;
  giphyFinished = false;
  page = 0;


  constructor() {
  }

  ngOnInit() {

    this.trendingGiphy();
  }


  trendingGiphy() {

    this.loading = true;
    let settings: any = {limit: 50};
    if (this.stickers) {
      settings = {limit: 50, api: 'stickers'};
    }
    this.giphy.trending(settings)
      .then(res => {


        this.loading = false;
        this.giphyResults = res.data;
      })
      .catch(console.error);
  }


  searchGiphy() {

    if (!this.giphyFinished) {
      const searchTerm = this.giphySearchTerm;
      const offset = this.page * 25;
       let settings: any = {q: searchTerm, offset: offset};
    if (this.stickers) {
      settings = {q: searchTerm, offset: offset, api: 'stickers'};
    }
      this.loading = true;
      this.giphy.search(settings)
        .then(res => {

          this.loading = false;
          if (res.data.length < 25) {
            this.giphyFinished = true;
          }


          if (!this.giphyResults || this.page === 0) {
            this.giphyResults = res.data;
          } else {

            this.giphyResults = this.giphyResults.concat(res.data);
          }

          this.page = this.page + 1;


        })
        .catch(console.error);
    }
  }


  onScrolled(event) {

    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 20) {
      if (this.giphySearchTerm && !this.loading) {
        this.searchGiphy();
      }
    }
  }


  onSearch(keyWord: string) {
    this.giphyFinished = false;
    this.page = 0;
    if (keyWord) {
      this.giphySearchTerm = keyWord;

      this.giphyResults = [];
      this.searchGiphy();
    } else {
      this.giphyResults = [];
      this.trendingGiphy();
    }
  }

  sendGif(title, url) {

    this.selectGiphy.emit({title: title, url: url});

  }

}
