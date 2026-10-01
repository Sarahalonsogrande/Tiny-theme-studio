import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from "@app/shared/components/buttons/language-switcher/language-switcher.component";
import { DisclosureWidgetComponent } from "@app/shared/components/disclosure-widget/disclosure-widget.component";

@Component({
  selector: 'app-readme',
  imports: [LanguageSwitcherComponent, TranslateModule, DisclosureWidgetComponent],
  templateUrl: './readme.component.html',
  styleUrl: './readme.component.scss',
})
export class ReadmeComponent {

}
