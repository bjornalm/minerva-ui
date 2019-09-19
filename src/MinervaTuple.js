class MinervaTuple {
  constructor(rawTuple) {
    this.attributes = rawTuple.map(attr => {
      const type = Object.keys(attr)[0];
      const value = attr[type];
      return { type, value };
    });
  }

  getAttributeValue(columnName, form) {
    const index = form.indexOf(columnName);
    const attributeObj = this.attributes[index];
    return attributeObj.value;
  }
}

// function findAtomAttributeValue(tuple, attributeName) {
//   const attribute = tuple.find(attribute =>
//     attribute.hasOwnProperty(attributeName)
//   );
//   if (!attribute) {
//     console.error(
//       `Expected to find an attribute ${attributeName} in tuple: `,
//       tuple
//     );
//   } else {
//     return attribute[attributeName];
//   }
// }

export default MinervaTuple;
