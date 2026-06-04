import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Modelo del documento en Firestore.
export interface Favorite {
  userId: string;
  characterId: number;
  addedAt: Date;
}

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  addFavorite(userId: string, characterId: number): Promise<void> {
    console.warn('Firebase no está configurado. addFavorite() no hace nada.');
    return Promise.resolve();
  }

  removeFavorite(userId: string, characterId: number): Promise<void> {
    console.warn('Firebase no está configurado. removeFavorite() no hace nada.');
    return Promise.resolve();
  }

  getFavoritesByUser(userId: string): Observable<Favorite[]> {
    console.warn('Firebase no está configurado. getFavoritesByUser() devuelve lista vacía.');
    return of([]);
  }
}
