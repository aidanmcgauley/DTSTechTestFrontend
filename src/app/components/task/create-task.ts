import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.html',
  styleUrls: ['./create-task.css']
})
export class CreateTaskComponent {
  taskForm!: FormGroup;          // Declare first
  createdTask: Task | null = null;
  serverError: string | null = null;

  statuses = [
    { value: 0, label: 'Not Started' },
    { value: 1, label: 'In Progress' },
    { value: 2, label: 'Complete' }
  ];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    // Initialize form in constructor to avoid 'this.fb' errors
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: [''],
      status: [0, Validators.required],
      dueDateTime: ['', [Validators.required, this.futureDateValidator]]
    });
  }

  // Custom validator to ensure date/time is in the future
  futureDateValidator(control: any) {
    if (!control.value) return null;
    const entered = new Date(control.value);
    return entered > new Date() ? null : { notFuture: true };
  }

  onSubmit() {
    console.log("Form submitted!");
    this.serverError = null;

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const payload = {
      title: this.taskForm.get('title')?.value,
      description: this.taskForm.get('description')?.value,
      status: Number(this.taskForm.get('status')?.value),
      dueDateTime: new Date(this.taskForm.get('dueDateTime')?.value).toISOString()
    };

    this.taskService.createTask(payload).subscribe({
      next: (res) => {
        this.createdTask = res;
        // Reset form but keep default status
        this.taskForm.reset({ status: 'NotStarted' });
      },
      error: (err) => {
        console.error(err);
        this.serverError = err?.error?.message || err?.message || 'Server error';
      }
    });
  }
}
