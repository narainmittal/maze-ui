import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatDividerModule
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
    MatDividerModule
  ],
  declarations: []
})
export class MaterialModule {}
