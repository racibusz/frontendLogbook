import { DetailsDTO } from "../../DTOs/detailsDTO";
import { ItemListDTO } from "../../DTOs/itemListDTO";

export class DetailsSections implements DetailsDTO {
  sections: DetailsDTO['sections'] = [
    {
      title: "Samolot",
      iconName: "airplanemode_active",
      table: [
        { th: "id typu", td: "{{aircraftType.id}}", editable: true, format: null},
        { th: "Rejestracja", td: "{{registration}}", editable: false, format: 'UPPERCASE' },
        { th: "Typ ICAO", td: "{{aircraftType.type}}", editable: true, format: 'UPPERCASE', autocomplete: true},
        { th: "Model", td: "{{aircraftType.model}}", editable: false, format: null },
        { th: "Kategoria", td: "{{aircraftType.category}}", editable: false, format: null }
      ]
    },
    {
      title: "Wynajem",
      iconName: "attach_money",
      table: [
        {th: "Cena za godzinę", td: "{{pricePerHour}}", editable: true, format: null},
      ]
    },
    {
      title: "Właściciel",
      iconName: "perm_identity",
      table: [
        { th: "Imię", td: "{{owner.firstName}}", editable: false, format: null},
        { th: "Nazwisko", td: "{{owner.lastName}}", editable: false, format: null},
        { th: "E-mail", td: "{{owner.email}}", editable: false, format: null},
        { th: "Adres (ulica)", td: "{{owner.address1}}", editable: false, format: null},
        { th: "Adres (numer budynku)", td: "{{owner.address2}}", editable: false, format: null},
        { th: "Adres (miejscowość)", td: "{{owner.address3}}", editable: false, format: null},
        
      ]
    }
  ];
}
export class ListSections implements ItemListDTO {
  rows:ItemListDTO['rows'] = [
    {
      cols: [
        { icon: "airplanemode_active", text: "{{registration}}({{aircraftType.type}})", isHeader: false },
        { icon: "", text: "{{aircraftType.model}}", isHeader: false}
      ]
    }
  ]
}