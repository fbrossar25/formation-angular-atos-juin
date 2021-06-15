import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '../icons/icons.module';
import { TemplatesModule } from '../templates/templates.module';
import { UiModule } from '../ui/ui.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [CommonModule],
  exports: [UiModule, TemplatesModule, IconsModule, FooterComponent, HeaderComponent, NavComponent],
})
export class CoreModule {}
