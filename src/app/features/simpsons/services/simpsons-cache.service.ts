import { Injectable } from '@angular/core';

import { SimpsonsCharacter } from '../models/simpsons.interface';

@Injectable({ providedIn: 'root' })
export class SimpsonsCacheService {

  private readonly key = 'simpsons-character-cache';

  getById(id: number): SimpsonsCharacter | null {

    const map = this.readMap();

    return map[id] ?? null;
  }

  save(character: SimpsonsCharacter): void {

    const map = this.readMap();

    map[character.id] = character;

    localStorage.setItem(
      this.key,
      JSON.stringify(map)
    );
  }

  private readMap(): Record<number, SimpsonsCharacter> {

    const raw = localStorage.getItem(this.key);

    return raw ? JSON.parse(raw) : {};
  }
}