import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform } from 'ionic-angular';
// declare const cordova: any;
declare const evothings: any;

interface Becon {
  id: string;
  url: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  beaconData: any = false;
  beacons = {};
  random: number = 0;

  // Añadir una entrada por cada beacon con su url
  // para que funcione sin problema usa HTTPS
  private beaconDirectory: Array<Becon> = [
    //{"id":"DB:BB:62:4C:3F:B0", "url":"http://www.mazportal.com/beacon/uno/"},
    { "id": "DB:BB:62:4C:3F:B0", "url": "https://tinyurl.com/y92cm23h" },
    //{"id":"40,0,129,150,203,140", "url":"beacon1.html"},
    //{"id":"C2:89:B8:9E:48:CC", "url":"http://www.mazportal.com/beacon/dos/"},
    { "id": "C2:89:B8:9E:48:CC", "url": "https://tinyurl.com/y8h3wg7g" },
    //{"id":"236,175,56,243,83,138", "url":"beacon2.html"},
    { "id": "id_beacon_04", "url": "https://tinyurl.com/ya6pc374" },
    { "id": "id_beacon_05", "url": "https://evothings.com/" }
  ];

  constructor(private change: ChangeDetectorRef, private platform: Platform) {

  }

  startScanForBeacones() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((beacon) => {
        // console.log(beacon);
        beacon.timeStamp = Date.now();
        this.beacons[beacon.address] = beacon;

        this.nearestBeocon();

        setTimeout(() => {
          console.log('setTimeout');
          this.change.detectChanges();
        }, 500);
      });
    }).catch(err => console.log(err));
  }

  nearestBeocon() {
    let beaconList = [];
    for (let key in this.beacons) {
      beaconList.push(this.beacons[key]);
    }

    beaconList.sort((beacon1, beacon2): number => {
      let result = this.mapBeaconRSSI(beacon1.rssi) < this.mapBeaconRSSI(beacon2.rssi);
      return result ? 1 : 0;
    });

    this.random = Math.random();
    this.beaconData = beaconList.splice(0, 1)[0];
    this.beaconData.www = this.getBeaconUrl(this.beaconData.address);
  }

  /**
 * Map the RSSI value to a value between 1 and 100.
 */
  mapBeaconRSSI(rssi): number {
    if (rssi >= 0) return 1; // Unknown RSSI maps to 1.
    if (rssi < -100) return 0; // Max RSSI
    return 100 + rssi;
  }



  //Esta función se llama desde app.js
  getBeaconUrl(beaconId) {
    let url = '';
    for (let i = 0; i < this.beaconDirectory.length; i++) {
      if (this.beaconDirectory[i].id === beaconId) {
        url = this.beaconDirectory[i].url;
        break;
      }
      //console.log(typeof url+' url3 '+ url.length); 
    }

    return url;
  }

  getBeaconStringMacAddress(beacon): string {
		return beacon.address ? beacon.address : ''; 
	}
}
