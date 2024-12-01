import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../@AppService/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentLanguageSubscription!: Subscription;
  language = 'en';

  constructor(
    private styleServiceService: LanguageService,
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    if (isPlatformBrowser(platformId)) {
      this.currentLanguageSubscription = this.styleServiceService.currentLanguage.subscribe(l => {
        this.changeLangage(l, true);
      });
    }

    translate.setDefaultLang('en');
  }

  changeLangage(lang: string, fromLocalStorage: boolean) {
    let htmlTag = this.document.getElementsByTagName(
      "html"
    )[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.changeCssFile(lang);
    this.language = htmlTag.dir;

    if (fromLocalStorage == false) {
      this.styleServiceService.updateLanguage(lang);
      window.location.reload();
    }
  }
  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName(
      "head"
    )[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById(
      "langCss"
    ) as HTMLLinkElement;

    let bundleName = lang === "ar" ? "ar.css" : "en.css";

    if (existingLink) {
      existingLink.href = bundleName;
    } else {
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.type = "text/css";
      newLink.id = "langCss";
      newLink.href = bundleName;
      headTag.appendChild(newLink);
    }
  }
}
