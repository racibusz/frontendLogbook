export interface DetailsDTO {
    sections: {
        title: string;
        subTitle?: string;
        iconName: string;
        table: {
            th: string;
            td: string;
            format: string | null;
            editable: boolean;
            onInput?: (event: Event) => void;
        }[];
    }[];
}
