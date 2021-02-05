export function setCookie(key, value) {
  document.cookie = `${key}=${encodeURIComponent(value)}`;
}

export function getCookie(key) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(key) {
  document.cookie = `${key}=; Max-Age=0`;
}

export function getEvents() {
  const replaced = getCookie('calendar').replaceAll('},', '}},');
  const events = replaced.split('},');
  events.forEach((item, index) => {
    events[index] = JSON.parse(item);
  });
  return events;
}
