import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApplicationsService } from './applications.service';

describe('ApplicationsService', () => {
  let service: ApplicationsService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApplicationsService],
    });
    service = TestBed.inject(ApplicationsService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all applications', () => {
    service.getApplications().subscribe((application: any) => {
      expect(application).toBeTruthy();
      expect(application.length).toBeGreaterThan(0);
    });

    const mockReq = testingController.expectOne('./assets/info.json');
    expect(mockReq.request.method).toBe('GET');
    mockReq.flush(Object.values('../assets/info.json'));
  });
});
