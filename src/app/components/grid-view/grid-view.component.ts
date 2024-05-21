import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [MatGridListModule, CommonModule],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css',
})
export class GridViewComponent implements OnInit {
  @Input() apps: any[] = [];
  ngOnInit(): void {
    console.log(this.apps);
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
    getStatusBackgroundColor(status: string): string {
    switch (status) {
      case 'approved':
        return 'green';
      case 'in progress':
        return 'orange';
      default:
        return 'lightgray';
    }
  }
}
