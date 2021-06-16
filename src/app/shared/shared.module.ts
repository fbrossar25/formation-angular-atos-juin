import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemplatesModule } from '../templates/templates.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TemplatesModule],
  exports: [TemplatesModule],
})
export class SharedModule {}
