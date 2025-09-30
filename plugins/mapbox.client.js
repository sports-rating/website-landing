import { defineNuxtPlugin } from "#app";
import mapboxgl from "mapbox-gl";

export default defineNuxtPlugin(() => {
  mapboxgl.accessToken = "pk.eyJ1IjoibXVraGFtbWFkaXJtYXRvdiIsImEiOiJjbHoxNHhmZnkyaXRoMmlxc2ExbWJpYTc1In0.CE43UNvdFFRSiDbgPDNoZQ"; 
});