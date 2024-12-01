import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class LanguageService {
  private currentLanguageBehaviorSub!: BehaviorSubject<string>;
  public currentLanguage!: Observable<string>;

  constructor(@Inject(PLATFORM_ID) platformId: string) {
    if (isPlatformBrowser(platformId)) {
      this.currentLanguageBehaviorSub = new BehaviorSubject<string>(
        JSON.parse(localStorage.getItem("currentLanguage")!)
      );
      this.currentLanguage = this.currentLanguageBehaviorSub.asObservable();
      if (!localStorage.getItem("currentLanguage")) {
        localStorage.setItem("currentLanguage", JSON.stringify("en"));
        this.currentLanguageBehaviorSub.next("en");
      }
    }
  }
  public get currentUserLanguage(): string {
    let userlanguage = this.currentLanguageBehaviorSub.value;
    return userlanguage;
  }
  updateLanguage(language: string) {
    localStorage.setItem("currentLanguage", JSON.stringify(language));
    this.currentLanguageBehaviorSub.next(language);
  }
}
