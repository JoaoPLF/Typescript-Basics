/**
 * 
 * @param {number} contactId 
 * @returns 
 */

function getContact(contactId) {
  return {
    id: +this.id,
    name: this.name,
    birthDate: new Date()
  }
};

// Type mismatch
// let contact = getContact("1");
// contact.id = "123";
// contact.birthDate = "10/10/1990";

let contact = getContact(1);
contact.id = 123;
contact.birthDate = new Date("10/10/1990");