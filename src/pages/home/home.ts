import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserTab } from '@ionic-native/browser-tab';

declare const evothings: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    BrowserTab
  ]
})
export class HomePage {

  beaconData: any = null;
  beacons = {};
  random: number = 0;
  homeUrl: string = 'https://sites.google.com/view/smart-urbem-v1-0-uid/pagina-principal';

  // Añadir una entrada por cada beacon con su url
  // para que funcione sin problema usa HTTPS
  private beaconDirectory: Array<any> = [
    {
      id: 'DB:BB:62:4C:3F:B0',
      url: 'https://tinyurl.com/y92cm23h',
      img: 'assets/imgs/www/site1/main.jpg',
      title: 'El Faro Mazatlán',
      body: 'El majestuoso faro de Mazatlán se encuentra ubicado en la cima del cerro del Crestón, en el extremo sur de la península de la ciudad de Mazatlán, Sinaloa, México. El faro tiene la peculiaridad de estar asentado en lo que era antiguamente una isla y tiene una longitud de 641 metros por 321 metros de ancho y una altitud de 157 metros y el hecho de estar sobre una imponente formación natural lo hace ser aun más espectacular.'
    },
    {
      id: 'C2:89:B8:9E:48:CC',
      url: 'https://tinyurl.com/y8h3wg7g',
      img: 'assets/imgs/www/site2/main.jpg',
      title: 'Monumento Al Pescador (Monos Bichis)',
      body: 'El Monumento al Pescador de la Ciudad de Mazatlán se encuentra en la Avenida del Mar. Este es uno de los monumentos más representativos de la ciudad y también se le conoce como “Los Monos Bichis”, figuras humanas desnudas en perfecta armonía con elementos marinos como un pez vela y un delfín, además de la silueta de una mujer recostada, todo esto debajo de un faro. '
    }
  ];


  constructor(
    public sanitizer: DomSanitizer,
    private change: ChangeDetectorRef,
    private platform: Platform,
    private browserTab: BrowserTab
  ) {
  }

  ionViewDidLoad() {
    this.startScanForBeacones();
  }

  startScanForBeacones() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((beacon) => {
        // console.log(beacon);
        beacon.timeStamp = Date.now();
        this.beacons[beacon.address] = beacon;
        this.nearestBeocon();
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
    if (this.beaconData === null || this.beaconData.id != this.beaconData.address) {
      this.beaconData = beaconList.splice(0, 1)[0];
      console.log(this.beaconData);
      this.beaconData.data = this.getBeaconUrl(this.beaconData.address);
      this.change.detectChanges();
    }
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
    let data = '';
    for (let i = 0; i < this.beaconDirectory.length; i++) {
      if (this.beaconDirectory[i].id === beaconId) {
        data = this.beaconDirectory[i];
        break;
      }
      //console.log(typeof url+' url3 '+ url.length); 
    }

    return data;
  }

  getBeaconStringMacAddress(beacon): string {
    return beacon.address ? beacon.address : '';
  }

  openDetails(beaconData) {
    if (this.platform.is('cordova')) {
      this.browserTab.isAvailable()
        .then(isAvailable => {
          if (isAvailable) {
            this.browserTab.openUrl(beaconData.url);
          }
        });
    };
  }
}
