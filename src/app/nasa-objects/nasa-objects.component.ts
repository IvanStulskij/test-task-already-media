import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { INasaObject } from '../models/nasa-object';

@Component({
  selector: 'app-nasa-objects',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './nasa-objects.component.html',
  styleUrl: './nasa-objects.component.css'
})
export class NasaObjectsComponent {
  nasaObjects: INasaObject[] = [
    { dbId: "", name: "", id: 123, recclass: "", reclat: 12, reclong: 11, nameType: "dsd", geolocation: { coordinates: [], type: "fdfd" }, year: new Date(1000), mass: 12, fall: "fdfd" },
  ];

  displayedColumns: string[] = ['name', 'recclass', 'nameType', 'year'];
}
