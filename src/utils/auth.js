const KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
}

export function getToken() {
    return {
      accessToken: getAccessToken(),
      refreshToken: getRefreshToken(),
    }
}

export function getAccessToken() {
    return localStorage.getItem(KEYS.ACCESS_TOKEN) || null;
}

export function getRefreshToken() {
    return localStorage.getItem(KEYS.REFRESH_TOKEN) || null;
  }

export function setToken(data) {
    localStorage.setItem(KEYS.ACCESS_TOKEN, data.access_token);
    localStorage.setItem(KEYS.REFRESH_TOKEN, data.refresh_token);
}

export function removeToken() {
    localStorage.removeItem(KEYS.ACCESS_TOKEN);
    localStorage.removeItem(KEYS.REFRESH_TOKEN);
}