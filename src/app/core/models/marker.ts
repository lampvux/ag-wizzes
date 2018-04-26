
import { Injectable } from '@angular/core';
export interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
