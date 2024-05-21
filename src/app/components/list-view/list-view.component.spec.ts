import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewComponent } from './list-view.component';
import { HomeComponent } from '../../pages/home/home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewComponent, HomeComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process apps data correctly in list view', () => {
    const apps = [
      {
        submitData: '2024-04-09',
        arrivalDate: '2024-04-10',
        documentNumber: '123456',
        referenceNumber: 'REF123',
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        documentType: 'Passport',
        issuer: 'ISSUER',
        issuerFlag: 'FLAG',
        gender: 'Male',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        carrierLogo: 'carrier_logo.png',
        arrivalCarrier: 'Carrier',
      },
    ];

    const expectedRowData = [
      {
        submitData: '2024-04-09',
        arrivalDate: '2024-04-10',
        documentNumber: '123456',
        referenceNumber: 'REF123',
        firstName: 'JOHN, DOE',
        age: 30,
        documentType: 'PASSPORT',
        issuer: 'ISSUER',
        issuerFlag: 'FLAG',
        gender: 'Male',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        carrierLogo: 'carrier_logo.png',
        arrivalCarrier: 'Carrier',
      },
    ];

    component.processAppsData(apps);
    expect(component.rowData).toEqual(expectedRowData);
  });

  it("should filter applications by applicant's first name", () => {
    const homeFixture = TestBed.createComponent(HomeComponent);
    const homeComponent = homeFixture.componentInstance;

    const apps = [
      {
        submitData: '2024-04-09',
        arrivalDate: '2024-04-10',
        documentNumber: '123456',
        referenceNumber: 'REF123',
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        documentType: 'Passport',
        issuer: 'ISSUER',
        issuerFlag: 'FLAG',
        gender: 'Male',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        carrierLogo: 'carrier_logo.png',
        arrivalCarrier: 'Carrier',
      },
    ];

    const expectedFilteredApps = [
      {
        submitData: '2024-04-09',
        arrivalDate: '2024-04-10',
        documentNumber: '123456',
        referenceNumber: 'REF123',
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        documentType: 'Passport',
        issuer: 'ISSUER',
        issuerFlag: 'FLAG',
        gender: 'Male',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        carrierLogo: 'carrier_logo.png',
        arrivalCarrier: 'Carrier',
      },
    ];

    homeComponent.applications = apps;
    homeComponent.searchApplication = 'John';

    homeComponent.applyFilter();

    expect(homeComponent.filteredApplications).toEqual(expectedFilteredApps);
  });
});
