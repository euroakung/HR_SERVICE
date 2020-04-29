import { Component, OnInit } from '@angular/core';
import knowledgeBaseData, { IKnowledgeBase } from 'src/app/data/knowledge-base';

@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.component.html'
})
export class KnowledgeBaseComponent implements OnInit {

  data: IKnowledgeBase[] = knowledgeBaseData;
  constructor() { }

  ngOnInit() {
  }

}
