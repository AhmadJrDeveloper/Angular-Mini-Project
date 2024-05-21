import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { ApplicationsService } from '../../applications.service';
import { CommonModule } from '@angular/common';
import { GridViewComponent } from '../../components/grid-view/grid-view.component';
import { ListViewComponent } from '../../components/list-view/list-view.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    MatDividerModule,
    NavbarComponent,
    GridViewComponent,
    ListViewComponent,
    MatGridListModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isGrid: boolean = true;
  applications: any[] = [];
  filteredApplications: any[] = [];
  searchApplication: string = '';
  numberOfApplications: number = 0;

  constructor(private appData: ApplicationsService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchApplications();
  }

  toggleGrid() {
    this.isGrid = !this.isGrid;
  }

  async fetchApplications(): Promise<void> {
    console.log('Fetching applications...');
    try {
      const data: any = await this.appData.getApplications().toPromise();
      this.applications = data;
      this.filteredApplications = [...this.applications];
      this.numberOfApplications = this.applications.length;
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  }

  applyFilter() {
    console.log('Applying filter...');
    this.filteredApplications = this.applications.filter((app) =>
      Object.values(app).some((val: any) =>
        val
          .toString()
          .toLowerCase()
          .includes(this.searchApplication.toLowerCase())
      )
    );
    console.log(
      'Filter applied. Filtered applications:',
      this.filteredApplications
    );
    this.numberOfApplications = this.filteredApplications.length;
  }
}
