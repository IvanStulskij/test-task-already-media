import { Component } from '@angular/core';
import { NasaObjectsComponent } from './nasa-objects/nasa-objects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NasaObjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-task-already-media';
}
