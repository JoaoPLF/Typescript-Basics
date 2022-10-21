const myType = { min: 1, max: 200 };
function save(source: typeof myType) {
  console.log(`${source.min} - ${source.max}`);
};