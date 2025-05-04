import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INasaObject } from '../models/nasa-object';
import { LoadResult } from '../models/load-result';
import { DataSourceLoadOptions } from '../models/data-source-load-options';

@Injectable({
providedIn: 'root'
})
export class NasaObjectsService {
private apiUrl = 'http://localhost:5174/NasaObjects';

constructor(private http: HttpClient) { }

    getNasaObjects(loadOptions: DataSourceLoadOptions): Observable<LoadResult> {
        const options = { params: { loadOptions: JSON.stringify(loadOptions) } };
        let params = new HttpParams();

       // Convert object keys and values to HttpParams
        Object.keys(loadOptions).forEach(key => {
            params = params.append(key, loadOptions.skip);
        });

        return this.http.get<LoadResult>(this.apiUrl, options);
    }
}