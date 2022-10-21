interface Contact {
  id: number;
  name: ContactName;
  email: string;
  birthDate?: ContactBirthDate;
  status?: ContactStatus;
};

interface Address {
  line1: string;
  line2: string;
  province: string;
  region: string;
  postalCode: string;
};

// enum ContactStatus {
//   Active = "active",
//   Inactive = "inactive",
//   New = "new"
// };

type ContactName = string;
type ContactBirthDate = Date | number | string;
type ContactStatus = "active" | "inactive" | "new";

type AddressableContact = Contact & Address;


function getBirthDate(contact: Contact) {
  if (typeof contact.birthDate === "number") {
    return new Date(contact.birthDate);
  }
  else if (typeof contact.birthDate === "string") {
    return Date.parse(contact.birthDate);
  }
  else {
    return contact.birthDate;
  }
};

let primaryContact: AddressableContact = {
  id: 1,
  name: "John",
  // birthDate: "10/10/1990"
  birthDate: new Date("10/10/1990"),
  email: "test@example.com",
  status: "active",
  line1: "",
  line2: "",
  province: "",
  region: "",
  postalCode: ""
};