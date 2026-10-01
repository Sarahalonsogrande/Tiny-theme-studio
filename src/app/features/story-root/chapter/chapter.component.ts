import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LinebreaksPipe } from "@app/shared/pipes/linebreaks.pipe";
import { MusicWidgetComponent } from '@app/shared/components/music-widget/music-widget.component';
import { Chapter } from '@app/core/constants/welcome/welcome-constants';
import { NavButtonComponent } from '@app/shared/components/buttons/nav-button/nav-button.component';

@Component({
  selector: 'app-chapter',
  imports: [TranslateModule, LinebreaksPipe, MusicWidgetComponent, NavButtonComponent],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss',
})
export class ChapterComponent {
  readonly chapter = input.required<Chapter>();
}
