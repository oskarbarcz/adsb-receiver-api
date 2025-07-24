import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Position } from '../../modules/position/entity/position.entity';

type PositionStoreEntry = {
  reports: Position[];
};

@Injectable()
export class PositionStore {
  readonly CACHE_KEY = 'position_reports';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getForCallsign(callsign: string): Promise<Position[]> {
    const store = await this.cacheManager.get<PositionStoreEntry>(
      this.CACHE_KEY,
    );

    if (store === undefined) {
      return [];
    }

    return store.reports.filter((report) => report.callsign === callsign);
  }

  async set(position: Position): Promise<void> {
    let currentSet: PositionStoreEntry | undefined =
      await this.cacheManager.get<PositionStoreEntry>(this.CACHE_KEY);

    if (currentSet === undefined) {
      currentSet = { reports: [] };
    }

    currentSet.reports.push({
      date: new Date().toISOString(),
      latitude: position.latitude,
      longitude: position.longitude,
      callsign: position.callsign,
    });
    await this.cacheManager.set(this.CACHE_KEY, currentSet);
  }

  async clearForCallsign(callsign: string): Promise<void> {
    const store = await this.cacheManager.get<PositionStoreEntry>(
      this.CACHE_KEY,
    );

    if (store === undefined) {
      return;
    }

    const filteredReports = store.reports.filter(
      (report) => report.callsign !== callsign,
    );

    await this.cacheManager.set(this.CACHE_KEY, { reports: filteredReports });
  }
}
