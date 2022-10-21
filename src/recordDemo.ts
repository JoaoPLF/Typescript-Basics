let rec: Record<string, string | number | boolean | Function> = { name: "Wruce Bayne" };
rec.number = 1234;
rec.active = true;
rec.log = () => console.log("awesome");

interface Query<TProp> {
  sort?: "asc" | "desc";
  matches(val: TProp): boolean;
};

// type ContactQuery = Partial<
//   Record<keyof Contact, Query>
// >;

// type ContactQuery = Omit<
//   Partial<
//     Record<keyof Contact, Query>
//   >,
//   "status" | "email"
// >;

// type ContactQuery = Partial<
//   Pick<
//     Record<keyof Contact, Query>,
//     "id" | "name"
//   >
// >;

type ContactQuery = {
  [TProp in keyof Contact]?: Query<Contact[TProp]>
};

type RequiredContactQuery = Required<ContactQuery>;

function searchContacts(contacts: Contact[], query: ContactQuery) {
  return contacts.filter(contact => {
    for (const property of Object.keys(contact) as (keyof Contact)[]) {
      const propertyQuery = query[property] as Query<Contact[keyof Contact]>;

      if (propertyQuery && propertyQuery.matches(contact[property])) {
        return true;
      }
    }

    return false;
  });
};

const filteredContacts = searchContacts([/* contacts */], {
  id: { matches: (id) => id === 123 },
  name: { matches: (name) => name === "Carol Weaver" },
});