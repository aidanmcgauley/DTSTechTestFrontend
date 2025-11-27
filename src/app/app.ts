import { Component, signal } from '@angular/core';
import { CreateTaskComponent } from './components/task/create-task';

@Component({
  selector: 'app-root',
  imports: [CreateTaskComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DTSFrontend');
}
