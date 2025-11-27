import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { CreateTaskComponent } from './create-task';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let mockTaskService: any;

  beforeEach(async () => {
    mockTaskService = { createTask: jest.fn().mockReturnValue(of({ id: 1 })) };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreateTaskComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    component.onSubmit();
    expect(mockTaskService.createTask).not.toHaveBeenCalled();
  });
});
