import { Component, OnInit } from '@angular/core';
import { MatTableModule,  } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NasaObjectsService } from '../services/nasa-objects-service';
import { HttpClientModule } from '@angular/common/http';
import { LoadResult } from '../models/load-result';
import { DataSourceLoadOptions } from '../models/data-source-load-options';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-nasa-objects',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule, CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatDatepickerModule, HttpClientModule],
  templateUrl: './nasa-objects.component.html',
  styleUrl: './nasa-objects.component.css',
  providers: [provideNativeDateAdapter()],
})

export class NasaObjectsComponent implements OnInit {
  today: Date = new Date();
  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();
  pageIndex = 0;
  totalCount = 100;
  beginYears: number[] = [];
  endYears: number[] = [];
  classes: string[] = [];
  beginYear: number = 0;
  endYear: number = 0;
  displayedColumns: string[] = ['name', 'recclass', 'nameType', 'year', 'mass'];
  recclass: string = "";
  name: string = "";
  sortField: string = "";
  sortDirection: string = "";

  loadOptions: DataSourceLoadOptions = {
    take: 10,
    skip: 0,
    requireTotalCount: true,
    filter: [],
    sort: []
  };
  fullLoadOptions: DataSourceLoadOptions = {
    take: 0,
    skip: 0,
    requireTotalCount: true,
    filter: [],
    sort: []
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
      this.totalCount = result.totalCount;
    });

    this.service.getNasaObjects(this.fullLoadOptions).subscribe(result => {
      this.beginYears = [...new Set(result.data.map(x => new Date(x.year).getFullYear()))].sort();
      this.beginYears.unshift(0);
      this.endYears = [...new Set(result.data.map(x => new Date(x.year).getFullYear()))].sort();
      this.endYears.unshift(0);
      this.classes = [...new Set(result.data.map(x => x.recclass))].sort();
      this.classes.unshift("Select class")
    });
  }

  changePage(event: PageEvent) : void {
    this.pageIndex = event.pageIndex;
    this.loadOptions.skip = this.pageIndex * 10;

    this.getNasaObjects();
  }

  changeSort(event: Sort) {
    this.sortField = event.active;
    this.sortDirection = event.direction;
    this.loadOptions.sort = [];
    this.getNasaObjects();
  }

  selectClass(event: MatSelectChange) : void {
    this.recclass = event.value;
    if (event.value == "Select class") {
      this.recclass = "";
    }
    this.loadOptions.filter = this.loadOptions.filter.filter(x => x[0] != 'Recclass');
    this.getNasaObjects();
  }

  clickKeyDown(event: KeyboardEvent) : void {
    if (event.code == "Enter") {
      this.getNasaObjects();
    }
  }

  selectYear(event: MatSelectChange) : void {
    if (event.source.placeholder == "From") {
      this.beginYear = event.value;
      this.endYears = this.beginYears.filter(x => x > this.beginYear);
      this.endYears.unshift(0);
      this.loadOptions.filter = this.loadOptions.filter.filter(x => x[0] != 'Year' && x[1] == '>');
    }
    else {
      this.endYear = event.value;
      this.loadOptions.filter = this.loadOptions.filter.filter(x => x[0] != 'Year' && x[1] == '<');
    }
    this.getNasaObjects();
  }

  getNasaObjects() : void {
    let utcDateBegin = "";
    let utcDateEnd = "";

    if (this.beginYear != 0) {
      utcDateBegin = new Date(`${this.beginYear}-01-01T20:00:00.000Z`).toLocaleString();
    }

    if (this.endYear != 0) {
      utcDateEnd = new Date(`${this.endYear}-01-01T20:00:00.000Z`).toLocaleString();
    }

    if (utcDateBegin != "" || utcDateEnd != "") {
      if (utcDateBegin != "" && utcDateEnd == "") {
        this.loadOptions.filter = [["Year", ">", utcDateBegin]];
      }
      else if (utcDateBegin == "" && utcDateEnd != "") {
        this.loadOptions.filter = [["Year", "<", utcDateEnd]];
      }
      else if (utcDateBegin != "" && utcDateEnd != "") {
        this.loadOptions.filter = [["Year", ">", utcDateBegin], ["and"], ["Year", "<", utcDateEnd]];
      }
    }

    if (this.recclass != "") {
      if (this.loadOptions.filter.length > 0) {
        this.loadOptions.filter.push(["and"]);
      }

      this.loadOptions.filter.push(["Recclass", "=", `${this.recclass}`]);
    }

    if (this.name != "") {
      if (this.loadOptions.filter.length > 0) {
        this.loadOptions.filter.push(["and"]);
      }

      this.loadOptions.filter.push(["Name", "contains", `${this.name}`]);
    }

    if (this.sortField != "") {
      this.loadOptions.sort.push({ desc: this.sortDirection == 'desc', selector: this.sortField })
    }
    
    this.service.getNasaObjects(this.loadOptions).subscribe(result => {
      this.nasaObjects = result;
      this.totalCount = result.totalCount;
    });
  }
}
