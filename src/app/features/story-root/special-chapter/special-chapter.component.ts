import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LinebreaksPipe } from '@app/shared/pipes/linebreaks.pipe';
import { SpecialChapter } from '@app/core/constants/welcome/welcome-constants';

@Component({
  selector: 'app-special-chapter',
  imports: [TranslateModule, LinebreaksPipe],
  templateUrl: './special-chapter.component.html',
  styleUrl: './special-chapter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialChapterComponent {
  readonly specialChapter = input.required<SpecialChapter>();
}
