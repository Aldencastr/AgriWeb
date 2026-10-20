export const campusLocation = {
    name: 'Recinto Universitario Pedro Aráuz Palacios (UNI-RUPAP)',
    latitude: 12.13832,
    longitude: -86.22397,
    coordinatesLabel: '12.13832° N, -86.22397° O'
}

export const campusMapsUrl = `https://www.google.com/maps/search/?api=1&query=${campusLocation.latitude},${campusLocation.longitude}`
export const campusDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${campusLocation.latitude},${campusLocation.longitude}`
export const campusMapEmbedUrl = `https://maps.google.com/maps?q=${campusLocation.latitude},${campusLocation.longitude}&output=embed&z=17`
