import { Component } from '@angular/core';
import {NgxBarcodeScannerService} from "@eisberg-labs/ngx-barcode-scanner";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'opticoursesV2';

  constructor(
    public service: NgxBarcodeScannerService
 ) {
   //Do constructor things...
 }


  value: any;

  quaggaConfig = {};

  onStartButtonPress() {
    this.service.start(this.quaggaConfig, 0.1)
  }

  onValueChanges(detectedValue: string) {
    console.log("Found this: " + detectedValue)
  }

  onStopButtonPress() {
    this.service.stop()
  }

  onError(e: any) {
    console.log(e)
  }
}
