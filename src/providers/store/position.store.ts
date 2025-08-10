import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Position } from '../../modules/position/entity/position.entity';

@Injectable()
export class PositionStore {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getForCallsign(callsign: string): Promise<Position[]> {
    const positions = await this.cacheManager.get<Position[]>(
      this.getCacheKey(callsign),
    );

    if (positions === undefined) {
      return [];
    }

    return positions.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }

  async set(position: Position): Promise<void> {
    let currentPositions = await this.cacheManager.get<Position[]>(
      this.getCacheKey(position.callsign),
    );

    if (currentPositions === undefined) {
      currentPositions = [];
    }

    await this.cacheManager.set(this.getCacheKey(position.callsign), [
      ...currentPositions,
      { ...position, date: position.date ?? new Date().toISOString() },
    ]);
  }

  async clearForCallsign(callsign: string): Promise<void> {
    await this.cacheManager.del(this.getCacheKey(callsign));
  }

  private getCacheKey(callsign: string): string {
    return `pos:${callsign}`;
  }
}
