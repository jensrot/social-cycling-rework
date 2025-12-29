import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-footer',
  styleUrl: 'footer.component.scss',
  imports: [MatToolbar],
  template: `
<mat-toolbar class="footer">
    <p>Copyright {{currentYear}} ©
        <a href="https://github.com/jensrott/Social-Cycling" target="_blank">
            Social Cycling
        </a>
    </p>
</mat-toolbar>
`,
})
export class FooterComponent {
  public currentYear: number = new Date().getFullYear();
}
