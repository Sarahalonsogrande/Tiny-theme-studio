import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainHeaderComponent } from "@app/shared/components/main-header/main-header.component";
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LinebreaksPipe } from "../../shared/pipes/linebreaks.pipe";
import { MusicWidgetComponent } from "@app/shared/components/music-widget/music-widget.component";
import { ChapterSectionComponent } from "./chapter-section/chapter-section.component";

@Component({
  selector: 'app-welcome',
  imports: [MainHeaderComponent, RouterLink, TranslateModule, LinebreaksPipe, MusicWidgetComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {

}
