export const SUPPORT_EMAIL = 'support@welcometomygarden.org';
export const mailToSupportHref = `mailto:${SUPPORT_EMAIL}`
export const emailAsLink = `<a class="link" href="${mailToSupportHref}">${SUPPORT_EMAIL}</a>`;
export const SHOP_URL = 'https://shop.welcometomygarden.org/';
export const SLOWBY_URL = 'https://slowby.travel';
export const DONATION_URL = 'https://opencollective.com/welcometomygarden/donate';
export const COMMUNITY_TRANSLATIONS_URL =
  'https://community.welcometomygarden.org/volunteer/translations';
export const DEFAULT_MAP_STYLE = 'mapbox://styles/mapbox/streets-v8';
export const ZOOM_LEVELS = {
  CITY: 11,
  ROAD: 14, // 14 or 15
  SMALL_COUNTRY: 7
};
export const VALID_FILETYPE_EXTENSIONS = ['gpx', 'geojson', 'kml', 'tcx'];
export const ICON_SIZE = [
  'interpolate',
  ['linear'],
  ['zoom'],
  0,
  0.2,
  ZOOM_LEVELS.SMALL_COUNTRY,
  0.3,
  ZOOM_LEVELS.CITY,
  0.4,
  ZOOM_LEVELS.ROAD,
  0.4
];
