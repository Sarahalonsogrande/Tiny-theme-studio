import { Component, computed, inject, input, signal, AfterViewInit, viewChild, ElementRef, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-music-widget',
  imports: [],
  templateUrl: './music-widget.component.html',
  styleUrl: './music-widget.component.scss',
})
export class MusicWidgetComponent implements AfterViewInit, OnDestroy {
  private readonly sanitizer = inject(DomSanitizer);

  private readonly allowedHosts = new Set<string>([
    'open.spotify.com',
    'www.youtube.com',
    'youtube.com',
    'music.youtube.com',
    'player.vimeo.com',
  ]);

  readonly src = input.required<string>();
  readonly title = input<string>('Music player');
  readonly album = input<string>('');
  readonly albumUrl = input<string>('');
  readonly width = input<string>('100%');
  readonly height = input<string>('80');
  readonly allowAutoplay = input<boolean>(false);

  readonly isInViewport = signal(false);
  readonly widgetContainer = viewChild<ElementRef>('widgetContainer');

  private observer?: IntersectionObserver;

  readonly albumHref = computed<string>(() => {
    const explicitUrl = this.albumUrl().trim();

    if (this.isAllowedSpotifyUrl(explicitUrl)) {
      return explicitUrl;
    }

    const albumName = this.album().trim();
    if (albumName) {
      return `https://open.spotify.com/search/${encodeURIComponent(albumName)}`;
    }

    return this.toSpotifyPublicUrl(this.src().trim()) ?? '';
  });

  readonly safeSrc = computed<SafeResourceUrl>(() => {
    const raw = this.src().trim();

    if (!this.isAllowedEmbedUrl(raw)) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(raw);
  });

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  private setupObserver(): void {
    const container = this.widgetContainer()?.nativeElement;
    if (!container || this.observer) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isInViewport.set(true);
            // Stop observing after it's loaded
            this.observer?.unobserve(container);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before it enters viewport
      }
    );

    this.observer.observe(container);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private isAllowedEmbedUrl(value: string): boolean {
    try {
      const url = new URL(value);
      const isHttps = url.protocol === 'https:';
      const isAllowedHost = this.allowedHosts.has(url.hostname);
      return isHttps && isAllowedHost;
    } catch {
      return false;
    }
  }

  private isAllowedSpotifyUrl(value: string): boolean {
    if (!value) {
      return false;
    }

    try {
      const url = new URL(value);
      return url.protocol === 'https:' && url.hostname === 'open.spotify.com';
    } catch {
      return false;
    }
  }

  private toSpotifyPublicUrl(value: string): string | null {
    if (!value) {
      return null;
    }

    try {
      const url = new URL(value);

      if (url.protocol !== 'https:' || url.hostname !== 'open.spotify.com') {
        return null;
      }

      const spotifyPath = url.pathname.replace('/embed', '');
      const normalizedPath = spotifyPath.startsWith('/') ? spotifyPath : `/${spotifyPath}`;

      return `https://open.spotify.com${normalizedPath}`;
    } catch {
      return null;
    }
  }
}
