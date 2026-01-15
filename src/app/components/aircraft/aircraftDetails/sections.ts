import { DetailsDTO } from "../../../DTOs/detailsDTO";

export class Sections implements DetailsDTO {
  sections: DetailsDTO['sections'] = [
    {
      title: "Samolot",
      iconName: "airplanemode_active",
      table: [
        { th: "Rejestracja", td: "registration", editable: false, format: 'UPPERCASE' },
        { th: "Typ ICAO", td: "aircraftType.type", editable: true, format: 'UPPERCASE'},
        { th: "Model", td: "aircraftType.model", editable: false, format: null },
        { th: "Kategoria", td: "aircraftType.category", editable: false, format: null }
      ]
    },
  ];
}
