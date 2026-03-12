import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  private readonly http = inject(HttpClient);

  readonly isNoteOpen = signal(false);
  readonly isNoteLoading = signal(false);
  readonly noteTitle = signal('');
  readonly noteContent = signal('');
  readonly noteError = signal('');

  openNote(path: string, title: string): void {
    this.noteTitle.set(title);
    this.noteError.set('');
    this.noteContent.set('');
    this.isNoteOpen.set(true);
    this.isNoteLoading.set(true);

    this.http.get(`/docs/${path}`, { responseType: 'text' }).subscribe({
      next: (content) => {
        this.noteContent.set(content);
        this.isNoteLoading.set(false);
      },
      error: () => {
        this.noteError.set('No se pudo cargar la nota.');
        this.isNoteLoading.set(false);
      },
    });
  }

  closeNote(): void {
    this.isNoteOpen.set(false);
    this.isNoteLoading.set(false);
  }
}
