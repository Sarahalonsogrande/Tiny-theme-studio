import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LinebreaksPipe } from "../../../shared/pipes/linebreaks.pipe";

@Component({
  selector: 'app-chapter-section',
  imports: [TranslateModule, LinebreaksPipe],
  templateUrl: './chapter-section.component.html',
  styleUrl: './chapter-section.component.scss',
})
export class ChapterSectionComponent {

}
