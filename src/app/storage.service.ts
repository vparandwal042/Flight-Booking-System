import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    public data: any;
    receivedFilter: EventEmitter<any>;
    constructor() {
        this.receivedFilter = new EventEmitter<any>();
    }
    // 2
    raiseEvent(data: any): void {
        this.data = data;
        this.receivedFilter.emit(data);
    }
}