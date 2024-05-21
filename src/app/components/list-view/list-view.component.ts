import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-alpine.css';
@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule, MatListModule, AgGridAngular, AgGridModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css',
})
export class ListViewComponent implements OnChanges {
  @Input() apps: any[] = [];
  gridOptions: GridOptions = {
    pagination: true,
    paginationPageSizeSelector: false,
  };
  rowData: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apps']) {
      this.processAppsData(changes['apps'].currentValue);
    }
  }
  colDefs: ColDef[] = [
    { headerName: 'Submit Time', field: 'submitData', width: 150 },
    { headerName: 'Arrival Date', field: 'arrivalDate', width: 115 },
    { headerName: 'Ref', field: 'referenceNumber', width: 110 },
    { headerName: 'Name', field: 'firstName', width: 155 },
    { headerName: 'Age', field: 'age', width: 100 },
    { headerName: 'Document Type', field: 'documentType', width: 150 },
    { headerName: 'Document Number', field: 'documentNumber', width: 158 },
    {
      headerName: 'Document Issuer',
      field: 'issuer',
      width: 150,
      cellRenderer: (params: any) => {
        const imageUrl = params.data.issuerFlag;
        const issuer = params.data.issuer;
        return `<div style="display: flex; align-items: center;">
        <img src="${imageUrl}" alt="Nationality" style="width: 25px; height: 20px; margin-right: 10px;"/>
        <span>${issuer}</span>
      </div>`;
      },
    },
    {
      headerName: 'Nationality',
      field: 'issuerFlag',
      width: 120,
      cellRenderer: (params: any) => {
        const imageUrl = params.data.issuerFlag;
        const issuer = params.data.issuer;
        return `<div style="display: flex; align-items: center; justify-content: center;">
        <img src="${imageUrl}" alt="Nationality" style="width: 25px; height: 20px; margin-right: 10px;"/>
        <span>${issuer}</span>
      </div>`;
      },
    },
    { headerName: 'Gender', field: 'gender', width: 100 },
    {
      headerName: 'Arrival Carrier',
      field: 'arrivalCarrier',
      width: 150,
      cellRenderer: (params: any) => {
        const carrierLogo = params.data.carrierLogo;
        const arrivalCarrier = params.data.arrivalCarrier;
        const firstTwoLetters = arrivalCarrier.slice(0, 2).toUpperCase();

        return `<div style="display: flex; align-items: center; column-gap:10px">
          ${
            carrierLogo
              ? `<img src="${carrierLogo}" alt="carrier-logo" style="width: 20px; border-radius: 15px;"/>`
              : `<div style="background-color: #424242; border-radius: 15px; height: 20px; width: 20px; font-size: 10px; color: white; display: flex; align-items: center; justify-content: center;">${firstTwoLetters}</div>`
          }
          <span>${arrivalCarrier}</span>
        </div>`;
      },
    },
    { headerName: 'Email', field: 'email', width: 200 },
    { headerName: 'Phone Number', field: 'phoneNumber', width: 150 },
  ];

  processAppsData(apps: any[]): void {
    // Formatting the fetched data into the structure compatible with rowData
    this.rowData = apps.map((app: any) => ({
      submitData: app.submitData,
      arrivalDate: app.arrivalDate,
      documentNumber: app.documentNumber,
      referenceNumber: app.referenceNumber.toUpperCase(),
      firstName: (app.firstName + ', ' + app.lastName).toUpperCase(),
      age: app.age,
      documentType: app.documentType.toUpperCase(),
      issuer: app.issuer,
      issuerFlag: app.issuerFlag,
      gender: app.gender,
      email: app.email,
      phoneNumber: app.phoneNumber,
      carrierLogo: app.carrierLogo,
      arrivalCarrier: app.arrivalCarrier,
    }));
    // Manually triggering the change detection to ensure the view updates
    this.cdr.detectChanges();
  }
}
