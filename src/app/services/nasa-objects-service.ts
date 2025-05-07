import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadResult } from '../models/load-result';
import { DataSourceLoadOptions } from '../models/data-source-load-options';

@Injectable({
providedIn: 'root'
})
export class NasaObjectsService {
private apiUrl = 'http://localhost:5174/NasaObjects';

constructor(private http: HttpClient) { }
    andMark: string = `"and"`;

    getNasaObjects(loadOptions: DataSourceLoadOptions): Observable<LoadResult> {
        var filterString = JSON.stringify(loadOptions.filter);
        if (filterString.includes(this.andMark)) {
            filterString = filterString.replaceAll(`[${this.andMark}]`, `${this.andMark}`)
        }
        const options = { params: { skip: loadOptions.skip, take: loadOptions.take, requireTotalCount: loadOptions.requireTotalCount, filter: filterString, sort: JSON.stringify(loadOptions.sort) } };

        return this.http.get<LoadResult>(this.apiUrl, options);
    }
}