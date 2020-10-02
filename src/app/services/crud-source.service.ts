import { Injectable } from '@angular/core';
import {
    ActionDefinition,
    FreBaseSource,
    FreDataFilter,
    FreFullMetadata,
    FreMetadataConverter,
    ScreenMetadata,
    TranslationService
} from 'fre-base-components';
import { Observable } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { FreRequestService } from './fre-request.service';

@Injectable({
    providedIn: 'root'
})

export class CrudSourceService extends FreBaseSource {
    converter = new FreMetadataConverter();

    constructor(private freRequest: FreRequestService, private tService: TranslationService, ) {
        super(new FreMetadataConverter());
    }

    getAdicionalActions(screen: string): ActionDefinition<any>[] {
        return [];
    }

    getScreenMetadata(screen: string): Observable<ScreenMetadata> {
        return new Observable<FreFullMetadata>((obs) => {
        obs.next({
            customMetadata: require(`./../crud-gen/metadatas/locale/${this.tService.getCurrentLanguage().substring(0, 2)}/${screen}.json`),
            metadata: require(`./../crud-gen/metadatas/${screen}.json`)
        });
        obs.complete();
        }).pipe(
        delay(200)
        ).pipe(
        map(f => {
            return this.converter.convert(f);
        })
        );
    }

    getFilteredData(screen: string, filter: FreDataFilter): Observable<any> {
        return this.freRequest.getPerson().pipe(
            map((res) => {
                return {
                    totalItems: res.length,
                    list: res
                };
            })
        );
    }

    insertObj(screen: string, obj: any): Observable<any> {
        return this.freRequest.addPerson(obj);
    }

    updateObj(screen: string, obj: any, primaryKey: number): Observable<any> {
        return this.freRequest.uptPerson(obj, primaryKey);
    }

    deleteObj(screen: string, obj: any, primaryKey: number): Observable<any> {
        const ob = {
            id: primaryKey
        }
        return this.freRequest.delPerson(ob);
    }
}
