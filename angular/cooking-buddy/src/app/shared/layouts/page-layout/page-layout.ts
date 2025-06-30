import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './page-layout.html',
  styleUrls: ['./page-layout.scss']
})
export class PageLayoutComponent {}
