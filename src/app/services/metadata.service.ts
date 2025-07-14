import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface MetaData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  canonical?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  private readonly defaultMeta: MetaData = {
    title: 'Kaira - Premium Fashion & Lifestyle',
    description: 'Discover premium fashion and lifestyle products at Kaira. Shop curated collections of clothing, accessories, and lifestyle essentials.',
    keywords: 'fashion, lifestyle, premium, clothing, accessories, shopping, style, trends',
    image: '/images/logo.svg',
    url: 'https://kaira.devquery.in',
    type: 'website',
    author: 'Kaira'
  };

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  updateMetadata(metaData: Partial<MetaData> = {}): void {
    const data = { ...this.defaultMeta, ...metaData };

    // Update title
    if (data.title) {
      this.title.setTitle(data.title);
    }

    // Update standard meta tags
    this.updateTag('description', data.description);
    this.updateTag('keywords', data.keywords);
    this.updateTag('author', data.author);
    this.updateTag('robots', 'index, follow');

    // Update Open Graph tags
    this.updateProperty('og:title', data.title);
    this.updateProperty('og:description', data.description);
    this.updateProperty('og:image', data.image);
    this.updateProperty('og:url', data.url);
    this.updateProperty('og:type', data.type);

    // Update Twitter tags
    this.updateProperty('twitter:card', 'summary_large_image');
    this.updateProperty('twitter:title', data.title);
    this.updateProperty('twitter:description', data.description);
    this.updateProperty('twitter:image', data.image);
    this.updateProperty('twitter:url', data.url);

    // Update canonical URL if provided
    if (data.canonical) {
      this.updateCanonical(data.canonical);
    }
  }

  private updateTag(name: string, content?: string): void {
    if (content) {
      this.meta.updateTag({ name, content });
    }
  }

  private updateProperty(property: string, content?: string): void {
    if (content) {
      this.meta.updateTag({ property, content });
    }
  }

  private updateCanonical(url: string): void {
    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  // Reset to default metadata
  resetToDefault(): void {
    this.updateMetadata(this.defaultMeta);
  }

  // Helper method to get current page metadata
  getDefaultMetadata(): MetaData {
    return { ...this.defaultMeta };
  }
}