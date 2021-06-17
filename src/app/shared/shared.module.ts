import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplatesModule } from '../templates/templates.module';
import { TableLiteComponent } from './components/table-lite/table-lite.component';
import { BtnComponent } from './components/btn/btn.component';
import { TotalPipe } from './pipes/total.pipe';

@NgModule({
  declarations: [
    TableLiteComponent,
    BtnComponent,
    TotalPipe
  ],
  imports: [CommonModule, TemplatesModule],
  exports: [TemplatesModule, TableLiteComponent, BtnComponent, TotalPipe],
})
export class SharedModule {}
