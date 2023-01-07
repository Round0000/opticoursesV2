import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'opticoursesV2';


  scanCompleteHandler(e: any) {
    console.log(e)
  }

}
