import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform } from 'ionic-angular';
// declare const cordova: any;
declare const evothings: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  beaconData: any = false;

  constructor(private change: ChangeDetectorRef, private platform: Platform) {

  }

  startScanForBeacones() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((data) => {
        this.beaconData = data;
        console.log(this.beaconData);
        setTimeout(() => {
          console.log('setTimeout');
          this.change.detectChanges();
        }, 500);
      });
    }).catch(err => console.log(err));
  }
}
