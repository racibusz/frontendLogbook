import { InputType } from "./inputTypes";

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
            inputType?: InputType;
            linkTo?: string;
            onInput?: (event: Event) => void;
        }[];
    }[];
}
