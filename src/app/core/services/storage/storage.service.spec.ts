import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
    let service: StorageService;

    // Simple in-memory mock for localStorage
    const createMockStorage = () => {
        const store: Record<string, string> = {};
        return {
            getItem: (k: string) => (k in store ? store[k] : null),
            setItem: (k: string, v: string) => { store[k] = String(v); },
            removeItem: (k: string) => { delete store[k]; },
            clear: () => { Object.keys(store).forEach(k => delete store[k]); },
        } as Storage;
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        // Install mock localStorage on window
        (window as any).localStorage = createMockStorage();
        service = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('save/load generic value', () => {
        service.save('foo', { a: 1 });
        const v = service.load<{ a: number }>('foo');
        expect(v).toEqual({ a: 1 });
    });

    it('saveList/loadList roundtrip', () => {
        service.saveList('list', [1, 2, 3]);
        const l = service.loadList<number>('list');
        expect(l).toEqual([1, 2, 3]);
    });

    it('getRaw and clearList', () => {
        service.save('raw', 'x');
        expect(service.getRaw('raw')).toBe('"x"');
        service.clearList('raw');
        expect(service.getRaw('raw')).toBeNull();
    });
});
