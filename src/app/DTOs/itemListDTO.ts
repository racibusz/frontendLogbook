export interface ItemListDTO{
    rows: {
        cols: {
            icon: string;
            text: string;
            isHeader: boolean;
        }[];
    }[];
}   