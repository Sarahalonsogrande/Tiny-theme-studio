import { Component, inject } from '@angular/core';
import { UiModeService } from '@app/core/services/ui-modes/ui-mode.service';
import { ReadmeComponent } from "../readme/readme.component";
import { DisclosureWidgetComponent } from "@app/shared/components/disclosure-widget/disclosure-widget.component";

@Component({
  selector: 'app-story-overview',
  imports: [ReadmeComponent, DisclosureWidgetComponent],
  templateUrl: './story-overview.component.html',
  styleUrl: './story-overview.component.scss',
})
export class StoryOverviewComponent {
  // Inyecta el servicio de modo UI
  private readonly uiModeService = inject(UiModeService);

  // Computed: true si el modo es oscuro
  readonly isDarkMode = this.uiModeService.isDarkMode;
}
