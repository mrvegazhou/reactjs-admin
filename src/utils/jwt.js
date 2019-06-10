export function getJWT() {
    return localStorage.getItem("jwt")
}

export function setJWT(token) {
    localStorage.setItem("jwt", token)
}

export function removeJWT() {
    localStorage.removeItem("jwt")
}