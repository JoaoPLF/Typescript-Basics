// type ContactFields = keyof Contact;

// function getValue(source: Contact, propertyName: ContactFields) {
//   return source[propertyName];
// };

function getValue<T, U extends keyof T>(source: T, propertyName: U) {
  return source[propertyName];
};

// const value = getValue(primaryContact, "sttaus"); Wrong property
const value = getValue(primaryContact, "status");
const value2 = getValue({ min: 1, max: 200 }, "max");