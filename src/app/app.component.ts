import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="static">
        Static
      </a>
      <a mat-button routerLink="dynamic">
        Dynamic
      </a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
