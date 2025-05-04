import { Component, OnInit } from '@angular/core';
import { MatTableModule,  } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NasaObjectsService } from '../services/nasa-objects-service';
import { HttpClientModule } from '@angular/common/http';
import { LoadResult } from '../models/load-result';
import { DataSourceLoadOptions } from '../models/data-source-load-options';

@Component({
  selector: 'app-nasa-objects',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, HttpClientModule],
  templateUrl: './nasa-objects.component.html',
  styleUrl: './nasa-objects.component.css'
})
export class NasaObjectsComponent implements OnInit {

  loadOptions: DataSourceLoadOptions = {
    take: 10,
    skip: 0
  };
  nasaObjects: LoadResult = {
    data: [],
    totalCount: 0
  };

  constructor(private service: NasaObjectsService) {

  }

  ngOnInit(): void {
    this.service.getNasaObjects(this.loadOptions).subscribe(result => {
      this.nasaObjects = result;
    });
  }

  displayedColumns: string[] = ['name', 'recclass', 'nameType', 'year', 'mass'];
}
