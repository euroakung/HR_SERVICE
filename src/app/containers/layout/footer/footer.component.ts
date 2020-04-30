import { Component, OnInit } from '@angular/core';
import { LangService, Language } from 'src/app/shared/lang.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  languages: Language[];
  currentLanguage: string;
  isSingleLang;
  constructor(private langService: LangService) { 

    this.languages = this.langService.supportedLanguages;
    this.currentLanguage = this.langService.languageShorthand;
    this.isSingleLang = this.langService.isSingleLang;
  }
  

  ngOnInit() {
  }

}
