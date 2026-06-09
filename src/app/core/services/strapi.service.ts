import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, finalize, map, of, tap } from 'rxjs';
import { Developer, Project } from './data';

interface StrapiEntry<T> {
  id: number;
  attributes: T;
}

interface StrapiCollection<T> {
  data: StrapiEntry<T>[];
  meta?: unknown;
}

interface StrapiImageData {
  data?: {
    attributes?: {
      url?: string;
    };
  };
}

interface StrapiProjectAttributes {
  title?: string;
  description?: string;
  technologies?: string[];
  demo?: string;
  repo?: string;
  featured?: boolean;
  image?: StrapiImageData;
}

interface StrapiDeveloperAttributes {
  slug?: string;
  name?: string;
  role?: string;
  tagline?: string;
  bio?: string;
  photo?: StrapiImageData;
  education?: {
    data?: Array<{ attributes?: { title?: string; place?: string; period?: string } }>;
  };
  skills?: string[];
  projects?: {
    data?: Array<{ attributes?: { name?: string; description?: string } }>;
  };
  contact?: {
    email?: string;
    github?: string;
    linkedin?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private readonly apiUrl = 'https://your-strapi-endpoint.com';
  readonly featuredProjects = signal<Project[]>([]);
  readonly developerDetail = signal<Developer | undefined>(undefined);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  loadFeaturedProjects() {
    this.loading.set(true);
    return this.http
      .get<StrapiCollection<StrapiProjectAttributes>>(
        `${this.apiUrl}/api/projects?populate=deep&filters[featured][$eq]=true`
      )
      .pipe(
        map((response) => response.data.map((entry) => this.mapProject(entry.attributes))),
        tap((projects) => this.featuredProjects.set(projects)),
        catchError((error) => {
          this.error.set(error?.message ?? 'Error cargando proyectos');
          return of([] as Project[]);
        }),
        finalize(() => this.loading.set(false))
      );
  }

  loadDeveloperBySlug(slug: string) {
    this.loading.set(true);
    return this.http
      .get<StrapiCollection<StrapiDeveloperAttributes>>(
        `${this.apiUrl}/api/developers?populate=deep&filters[slug][$eq]=${slug}`
      )
      .pipe(
        map((response) => {
          const entry = response.data[0];
          return entry?.attributes ? this.mapDeveloper(entry.attributes) : undefined;
        }),
        tap((developer) => this.developerDetail.set(developer)),
        catchError((error) => {
          this.error.set(error?.message ?? 'Error cargando desarrollador');
          return of(undefined);
        }),
        finalize(() => this.loading.set(false))
      );
  }

  private mapProject(attrs: StrapiProjectAttributes): Project {
    return {
      name: attrs.title ?? 'Proyecto',
      description: attrs.description ?? '',
      technologies: attrs.technologies ?? [],
      demo: attrs.demo,
      repo: attrs.repo,
      image: this.resolveUrl(attrs.image?.data?.attributes?.url),
    };
  }

  private mapDeveloper(attrs: StrapiDeveloperAttributes): Developer {
    return {
      slug: (attrs.slug ?? 'desarrollador') as 'milton' | 'jefferson',
      name: attrs.name ?? 'Desarrollador',
      role: attrs.role ?? 'Developer',
      photo: this.resolveUrl(attrs.photo?.data?.attributes?.url) ?? '/assets/default-avatar.jpg',
      tagline: attrs.tagline ?? '',
      bio: attrs.bio ?? '',
      education:
        attrs.education?.data?.map((item) => ({
          title: item.attributes?.title ?? '',
          place: item.attributes?.place ?? '',
          period: item.attributes?.period ?? '',
        })) ?? [],
      skills: attrs.skills ?? [],
      projects:
        attrs.projects?.data?.map((item) => ({
          name: item.attributes?.name ?? '',
          description: item.attributes?.description ?? '',
        })) ?? [],
      contact: {
        email: attrs.contact?.email ?? '',
        github: attrs.contact?.github ?? '',
        linkedin: attrs.contact?.linkedin ?? '',
      },
    };
  }

  private resolveUrl(url?: string): string | undefined {
    if (!url) {
      return undefined;
    }

    if (url.startsWith('http')) {
      return url;
    }

    return `${this.apiUrl}${url}`;
  }
}
