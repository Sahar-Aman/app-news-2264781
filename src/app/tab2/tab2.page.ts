import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces';
import { NewsService } from '../services/news.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  public categories: string[] =['business','entertainment','general','health','science','sports','technology'];
  public selectedCategory:string = this.categories[0];
  public articles:Article[]=[];

  constructor(private newsService:NewsService ) {}

  ngOnInit() {
      this.newsService.getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe(articles => {
        this.articles= [...this.articles, ...articles];
      } )
  }

  segmentChanged(event: any){
    this.selectedCategory=event.detail.value;
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory)
    .subscribe(articles => {
    this.articles= [ ...articles];
  })

}
}