import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatDividerModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatExpansionModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule {}
