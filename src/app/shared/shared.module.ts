import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplatesModule } from '../templates/templates.module';
import { BtnComponent } from './components/btn/btn.component';
import { TableLiteComponent } from './components/table-lite/table-lite.component';
import { StateDirective } from './directives/state.directive';
import { TotalPipe } from './pipes/total.pipe';

@NgModule({
  declarations: [TableLiteComponent, BtnComponent, TotalPipe, StateDirective],
  imports: [CommonModule, TemplatesModule, RouterModule],
  exports: [
    TemplatesModule,
    TableLiteComponent,
    BtnComponent,
    TotalPipe,
    StateDirective,
  ],
})
export class SharedModule {}
