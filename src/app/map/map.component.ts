import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Loader } from '@googlemaps/js-api-loader';
import { API_KEY } from '../../../key';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  title = 'google-maps';
  address!: string;
  position = { lat: 55.751244, lng: 37.618423 };
  isMarker = false;
  map?: any;

  constructor(private matDialogRef: MatDialogRef<MapComponent>) {}

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    let loader = new Loader({
      apiKey: API_KEY,
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map')!, {
        center: this.position,
        zoom: 12,
      });

      this.map.addListener('click', (e: any) => {
        this.position = e.latLng.toJSON();
        this.getLocation();
        this.placeMarker(e.latLng);
      });
    });
  }

  placeMarker(latLng: google.maps.LatLng) {
    new google.maps.Marker({
      position: latLng,
      map: this.map,
    });
  }

  getLocation() {
    let geocoder = new google.maps.Geocoder();
    let request = { location: this.position };
    geocoder.geocode(request, (results: any, status: any) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.address =
          results[0].address_components[0].short_name +
          ', ' +
          results[0].address_components[1].short_name +
          ', ' +
          results[0].address_components[2].short_name +
          ', ' +
          results[0].address_components[3].short_name;
      }
    });
  }

  ngOnDestroy() {
    if (this.address === undefined) {
      alert('Вы не поставили метку!');
    }
    this.matDialogRef.close(this.address);
  }
}
