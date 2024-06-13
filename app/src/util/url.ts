export function getLanguageFromURL(pathname: string) {
    const langCodeMatch = pathname.match(/\/([a-z]{2}-?[a-z]{0,2})\//)
    return langCodeMatch ? langCodeMatch[1] : "en"
}

export function getBaseURL(pathname: string) {
    const baseURL = pathname.replace("en/", '').replace("ja/", '')
    return baseURL
}