import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridViewComponent } from './grid-view.component';
import { By } from '@angular/platform-browser';
import { HomeComponent } from '../../pages/home/home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GridViewComponent', () => {
  let component: GridViewComponent;
  let fixture: ComponentFixture<GridViewComponent>;
  let homeComponent: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridViewComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no applicants message when apps length is 0', () => {
    component.apps = [];
    // fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.no-applicant-text').textContent).toContain('No Applicants with These Info');
  });

  it('should display applicants correctly', () => {
    const apps = [
      {
        image: 'image.jpg',
        tier: 'Tier 1',
        referenceNumber: 'REF123',
        submitData: new Date(),
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        age: 30,
        issuerFlag: 'issuerFlag.jpg',
        issuer: 'Issuer Name',
        carrierLogo: 'carrierLogo.jpg',
        arrivalCarrier: 'Carrier Code',
        arrivalDate: new Date(),
        status: 'pending'
      }
    ];
    component.apps = apps;
    fixture.detectChanges();
    
    const cardElements = fixture.debugElement.queryAll(By.css('.card'));
    expect(cardElements.length).toBe(1);

    const userImage = cardElements[0].query(By.css('.user-image'));
    expect(userImage.nativeElement.getAttribute('src')).toBe(apps[0].image);
  });

  it('should filter applications by applicant\'s first name', () => {
    const homeFixture = TestBed.createComponent(HomeComponent);
    const homeComponent = homeFixture.componentInstance;
    const apps = [
      {
        image: 'image.jpg',
        tier: 'Tier 1',
        referenceNumber: 'REF123',
        submitData: new Date(),
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        age: 30,
        issuerFlag: 'issuerFlag.jpg',
        issuer: 'Issuer Name',
        carrierLogo: 'carrierLogo.jpg',
        arrivalCarrier: 'Carrier Code',
        arrivalDate: new Date(),
        status: 'pending'
      },
    ];
    const expectedFilteredApps = [
      {
        image: 'image.jpg',
        tier: 'Tier 1',
        referenceNumber: 'REF123',
        submitData: new Date(),
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        age: 30,
        issuerFlag: 'issuerFlag.jpg',
        issuer: 'Issuer Name',
        carrierLogo: 'carrierLogo.jpg',
        arrivalCarrier: 'Carrier Code',
        arrivalDate: new Date(),
        status: 'pending'
      },
    ];
    homeComponent.applications = apps;
    homeComponent.searchApplication = 'John';

    homeComponent.applyFilter();

    expect(homeComponent.filteredApplications).toEqual(expectedFilteredApps);
  });
});
