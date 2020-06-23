export function getFilename(url: string) {
    if (url.startsWith("http")) {
        return String(url).substring(String(url).lastIndexOf('/') + 1, url.length) 
    }
    return url;
}