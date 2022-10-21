interface Person {
  id: number;
  name: string;
};

interface PersonContact {
  id: number;
  name: string;
  username: string;
}

function clone<T1, T2 extends T1>(source: T1): T2 {
  return Object.apply({}, source);
}

const p1: Person = { id: 123, name: "Homer" };
const p2 = clone<Person, PersonContact>(p1);

const dateRange = { startDate: Date.now(), endDate: Date.now() };
const dateRangeCopy = clone(dateRange);