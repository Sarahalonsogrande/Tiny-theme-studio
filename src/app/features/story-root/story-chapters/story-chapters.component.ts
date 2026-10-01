import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MainHeaderComponent } from "@app/shared/components/main-header/main-header.component";
import { ChapterComponent } from "@app/features/story-root/chapter/chapter.component";
import { CHAPTER, SPECIAL_CHAPTER } from '@app/core/constants/welcome/welcome-constants';
import { SpecialChapterComponent } from '@app/features/story-root/special-chapter/special-chapter.component';

@Component({
  selector: 'app-story-chapters',
  imports: [
    MainHeaderComponent,
    TranslateModule,
    ChapterComponent,
    SpecialChapterComponent
  ],
  templateUrl: './story-chapters.component.html',
  styleUrl: './story-chapters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryChaptersComponent {
  readonly chapters = CHAPTER;
  readonly specialChapters = SPECIAL_CHAPTER;
}
