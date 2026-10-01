import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StoryChaptersComponent } from "./story-chapters/story-chapters.component";
import { SPECIAL_CHAPTER } from '@app/core/constants/welcome/welcome-constants';
import { StoryOverviewComponent } from "./story-overview/story-overview.component";
import { StoryPrologueComponent } from './story-prologue/story-prologue.component';

@Component({
  selector: 'app-story-root',
  imports: [
    TranslateModule,
    StoryChaptersComponent,
    StoryPrologueComponent,
    StoryOverviewComponent
],
  templateUrl: './story-root.component.html',
  styleUrl: './story-root.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryRootComponent {
  readonly specialChapters = SPECIAL_CHAPTER;
}
