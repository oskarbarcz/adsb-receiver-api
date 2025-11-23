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

    // Track callsign in the set
    await this.addCallsignToSet(position.callsign);
  }

  async clearForCallsign(callsign: string): Promise<void> {
    await this.cacheManager.del(this.getCacheKey(callsign));
    await this.removeCallsignFromSet(callsign);
  }

  async getActiveCallsigns(maxAgeMinutes = 5): Promise<string[]> {
    const allCallsigns = await this.getAllCallsigns();
    const activeCallsigns: string[] = [];
    const now = new Date().getTime();
    const maxAgeMs = maxAgeMinutes * 60 * 1000;

    for (const callsign of allCallsigns) {
      const positions = await this.getForCallsign(callsign);
      if (positions.length > 0) {
        const latestPosition = positions[positions.length - 1];
        const positionTime = new Date(latestPosition.date).getTime();
        if (now - positionTime <= maxAgeMs) {
          activeCallsigns.push(callsign);
        }
      }
    }

    return activeCallsigns.sort();
  }

  private async getAllCallsigns(): Promise<string[]> {
    const callsigns = await this.cacheManager.get<string[]>(
      this.getCallsignsSetKey(),
    );
    return callsigns || [];
  }

  private async addCallsignToSet(callsign: string): Promise<void> {
    const callsigns = await this.getAllCallsigns();
    if (!callsigns.includes(callsign)) {
      await this.cacheManager.set(this.getCallsignsSetKey(), [
        ...callsigns,
        callsign,
      ]);
    }
  }

  private async removeCallsignFromSet(callsign: string): Promise<void> {
    const callsigns = await this.getAllCallsigns();
    const updatedCallsigns = callsigns.filter((cs) => cs !== callsign);
    await this.cacheManager.set(this.getCallsignsSetKey(), updatedCallsigns);
  }

  private getCacheKey(callsign: string): string {
    return `pos:${callsign}`;
  }

  private getCallsignsSetKey(): string {
    return 'callsigns:set';
  }
}
