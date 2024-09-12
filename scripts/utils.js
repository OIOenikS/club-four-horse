function defineWindowWidth () {
  return window.innerWidth;
}

export function selectDivider () {
  if (defineWindowWidth() >= 1170 ) return 3;
  else if (defineWindowWidth() < 1170 && defineWindowWidth() >= 700) return 2;
  else if (defineWindowWidth() < 700 ) return 1;
}


