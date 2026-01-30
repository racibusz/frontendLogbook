export interface DetailsDTO {
    sections: {
        title: string;
        subTitle?: string;
        iconName: string;
        table: {
            td: string;
            th: string;
            iconName?:string;
            format: string | null;
            editable: boolean;
            autocomplete?: boolean;
            linkTo?: string;
            onInput?: (event: Event) => void;
        }[];
    }[];
}
