import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  beaconDirectory: Array<any> = [
    {
      id: 'DB:BB:62:4C:3F:B0',
      url: 'https://tinyurl.com/y92cm23h',
      img: 'assets/imgs/sites/site1/main.jpg',
      title: 'El Faro Mazatlán',
      body: 'El majestuoso faro de Mazatlán se encuentra ubicado en la cima del cerro del Crestón, en el extremo sur de la península de la ciudad de Mazatlán, Sinaloa, México. El faro tiene la peculiaridad de estar asentado en lo que era antiguamente una isla y tiene una longitud de 641 metros por 321 metros de ancho y una altitud de 157 metros y el hecho de estar sobre una imponente formación natural lo hace ser aun más espectacular.'
    },
    {
      id: 'C2:89:B8:9E:48:CC',
      url: 'https://tinyurl.com/y8h3wg7g',
      img: 'assets/imgs/sites/site2/main.jpg',
      title: 'Monumento Al Pescador (Monos Bichis)',
      body: 'El Monumento al Pescador de la Ciudad de Mazatlán se encuentra en la Avenida del Mar. Este es uno de los monumentos más representativos de la ciudad y también se le conoce como “Los Monos Bichis”, figuras humanas desnudas en perfecta armonía con elementos marinos como un pez vela y un delfín, además de la silueta de una mujer recostada, todo esto debajo de un faro. '
    }
  ];

  constructor(public navCtrl: NavController) {

  }
}
