import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GridViewComponent } from '../../components/grid-view/grid-view.component';
import { ListViewComponent } from '../../components/list-view/list-view.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HttpClientTestingModule,
        GridViewComponent,
        ListViewComponent,
        MatIconModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle grid view when the toggle button is clicked', () => {  
    expect(component.isGrid).toBeTrue();
    expect(fixture.debugElement.query(By.css('app-grid-view'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-list-view'))).toBeFalsy();
    const listIcon = fixture.debugElement.query(By.css('[fontIcon="list_on"]'));
    expect(listIcon).toBeTruthy();
    listIcon.triggerEventHandler('click', null);
    fixture.detectChanges();
   
    expect(component.isGrid).toBeFalse();
    expect(fixture.debugElement.query(By.css('app-grid-view'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('app-list-view'))).toBeTruthy();
  
    const gridIcon = fixture.debugElement.query(By.css('[fontIcon="grid_on"]'));
    expect(gridIcon).toBeTruthy();
  
  
    gridIcon.triggerEventHandler('click', null);
    fixture.detectChanges();
  
    expect(component.isGrid).toBeTrue();
    expect(fixture.debugElement.query(By.css('app-grid-view'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-list-view'))).toBeFalsy();
  
    expect(listIcon).toBeTruthy();
  });

  it('should display containers title', () => {
    const pendingAppsHeader = fixture.debugElement.query(By.css('.main-title')).nativeElement;
    expect(pendingAppsHeader.textContent).toBe('Pending Applications');
  });
  
  it('should display the correct icon and number of pending applications in the header', () => {
    const listIcon = fixture.debugElement.query(By.css('[fontIcon="list_on"]'));
    listIcon.triggerEventHandler('click', null);
    fixture.detectChanges();
  
    const numberOfApplications = 10; 
    component.numberOfApplications = numberOfApplications;
    fixture.detectChanges();
  
    const userIconContainer = fixture.debugElement.query(By.css('.user-icon-container'));
    expect(userIconContainer).toBeTruthy(); 
  
    const personIcon = userIconContainer.query(By.css('.user-icon'));
    expect(personIcon).toBeTruthy(); 
  
    const numberOfAppsText = userIconContainer.query(By.css('.numberOfApplications')).nativeElement.textContent.trim();
    expect(numberOfAppsText).toBe(`${numberOfApplications}`);
  });
  

});
