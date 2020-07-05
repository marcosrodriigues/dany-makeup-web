export function getFilename(url: string) {
    if (url.startsWith("http")) {
        return String(url).substring(String(url).lastIndexOf('/') + 1, url.length) 
    }
    return url;
}

export function buildFormData(formData, data, parentKey: any = undefined) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else if (data instanceof Date) {
        const value = data == null ? '' : data;
        formData.append(parentKey, String(value));
    } else {
        const value = data == null ? '' : data;
        formData.append(parentKey, value);
    }
}

export function isDataValid(data) {
    let isValid = true;
    Object.keys(data).forEach(key => {
        const valid = data[key] !== '' ? true : false;
        
        if (!valid) isValid = false;
    })

    return isValid;
}