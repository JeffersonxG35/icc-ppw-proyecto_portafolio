import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, tap } from 'rxjs';
import { SimpsonsService } from '../../services/simpsons.service';
import { SimpsonsCacheService } from '../../services/simpsons-cache.service';
import { FavoritesService } from '../../../../core/services/favorites';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-simpson-detail-page',
  imports: [RouterLink],
  templateUrl: './simpson-detail-page.html',
})
export class SimpsonDetailPageComponent {

  private route = inject(ActivatedRoute);
  private simpsonsService = inject(SimpsonsService);
  private cacheService = inject(SimpsonsCacheService);
  private characterId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  characterResource = rxResource({

    stream: () => {
      const cached =
        this.cacheService.getById(this.characterId);
      if (cached) {
        return of(cached);
      }

      return this.simpsonsService
        .getCharacterById(this.characterId)
        .pipe(
          tap((character) =>
            this.cacheService.save(character)
          )
        );
    },
  });

    // authService como publico para poder leerlo en el template con authService.currentUser().
  authService = inject(AuthService);
  private favoritesService = inject(FavoritesService);

  // Signal local: refleja inmediatamente si el personaje es favorito sin esperar Firestore.
  isFavorite = signal(false);

  // Alterna entre guardar y eliminar segun el estado actual del signal.
  toggleFavorite() {
    const uid = this.authService.uid;
    if (!uid) return; // No hace nada si no hay sesion activa.

    if (this.isFavorite()) {
      // Si ya es favorito, lo eliminamos de Firestore.
      this.favoritesService.removeFavorite(uid, this.characterId).then(() => {
        this.isFavorite.set(false);
      });
    } else {
      // Si no es favorito, lo guardamos en Firestore.
      this.favoritesService.addFavorite(uid, this.characterId).then(() => {
        this.isFavorite.set(true);
      });
    }
  }
}