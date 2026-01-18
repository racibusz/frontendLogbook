export function getFieldValue(template: string, item: Object | null): string {
    if(item == null){
        return '';
    }
    if (!template || !item) {
        return template ?? '';
    }
    return template.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, fieldPath) => {
        const value = fieldPath
        .split('.')
        .reduce((obj: any, key: string) => obj?.[key], item as any);

        if (value == null) {
        return '';
        }

        let strValue = String(value);

        if (strValue.endsWith(':00')) {
        strValue = strValue.slice(0, -3);
        }

        return strValue;
    });
}