import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://fabulous-angel-0c4e172105.strapiapp.com/api';
  
  // Signals para datos reactivos
  readonly servicios = signal<any[]>([]);
  readonly proyectos = signal<any[]>([]);
  readonly programadores = signal<any[]>([]);
  readonly developerDetail = signal<any | undefined>(undefined);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  /**
   * Cargar todos los datos de Strapi (servicios, proyectos, programadores)
   */
  loadAllContent() {
    this.loading.set(true);
    this.error.set(null);

    // 1. Cargar servicios
    this.http.get<any>(`${this.apiUrl}/servicios`).pipe(
      map(res => res.data),
      tap(data => this.servicios.set(data || [])),
      catchError(error => {
        console.error('Error cargando servicios:', error);
        return of([]);
      })
    ).subscribe();

    // 2. Cargar proyectos
    this.http.get<any>(`${this.apiUrl}/proyectos?populate=*`).pipe(
      map(res => res.data),
      tap(data => this.proyectos.set(data || [])),
      catchError(error => {
        console.error('Error cargando proyectos:', error);
        return of([]);
      })
    ).subscribe();

    // 3. Cargar programadores (Aislamos el catchError para que no altere el Home global si falla)
   this.http.get<any>(`${this.apiUrl}/programadors?populate=*`).pipe(
      map(res => {
        // Si hay datos, aplanamos cada elemento del arreglo para que convivan directo con el HTML
        if (res && res.data) {
          return res.data.map((item: any) => ({
            id: item.id,
            ...item,
            ...(item.attributes ? item.attributes : {})
          }));
        }
        return [];
      }),
      tap(data => this.programadores.set(data || [])),
      catchError(error => {
        console.error('Error cargando programadores:', error);
        return of([]);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe();}

  /**
   * Cargar un programador específico por su slug (Strapi v5 plano)
   */
  getProgramadorBySlug(slug: string) {
  this.loading.set(true);
  this.error.set(null);

  return this.http.get<any>(`${this.apiUrl}/programadors?filters[slug][$eq]=${slug}&populate=*`).pipe(
    map(res => {
      if (res && res.data && res.data.length > 0) {
        const item = res.data[0];
        // Strapi v5 a veces mete los campos en item.attributes o directo en item.
        // Combinamos ambos por seguridad para que convivan sin romper el HTML.
        return {
          id: item.id,
          ...item,
          ...(item.attributes ? item.attributes : {})
        };
      }
      return null;
    }),
    tap(developer => {
        console.log('DEVELOPER DETAIL:', developer);
  console.log('PHOTO:', developer?.photo);

      this.developerDetail.set(developer);
    }),
    catchError(error => {
      console.error('Error cargando desarrollador:', error);
      this.error.set('No se pudo conectar con el servidor de datos.');
      return of(null);
    }),
    finalize(() => this.loading.set(false))
  );
}

  resolveImageUrl(url?: string): string {
    if (!url) return '/assets/default-image.jpg';
    // Si la URL ya es absoluta, devolverla tal cual
    if (url.startsWith('http')) return url;
    // Si la URL comienza con '/', asumir ruta relativa del servidor Strapi (autohosted)
    if (url.startsWith('/')) {
      return `https://fabulous-angel-0c4e172105.strapiapp.com${url}`;
    }
    // En caso contrario, devolver la cadena tal cual (posible URL ya formateada)
    return url;
  }
  
}