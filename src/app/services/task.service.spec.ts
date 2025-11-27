import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../environments/environment';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should post to environment api', () => {
    const sample = { title: 't', status: 'NotStarted', dueDateTime: new Date().toISOString() };
    service.createTask(sample as any).subscribe();
    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(sample);
    httpMock.verify();
  });
});
