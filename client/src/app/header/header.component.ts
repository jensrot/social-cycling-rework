import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  styleUrl: 'header.component.scss',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
  <mat-toolbar>
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
      <mat-icon>menu</mat-icon>
    </button>
    <div class="logo-container">
      <a routerLink="">Social Cycling</a>
      <span>BETA</span>
    </div>
    <span class="flex-spacer"></span>
      <a routerLink="/group-rides">Group rides</a>
      <a routerLink="/login">Login</a>
  </mat-toolbar>
`
})

export class HeaderComponent {
  // Authentcication logic would go here
}
