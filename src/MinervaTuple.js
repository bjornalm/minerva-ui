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

  getAttributeValues(columnName, form) {
    const values = [];
    form.columns.forEach((col, index) => {
      if (col === columnName) {
        const attr = this.attributes[index];
        values.push(attr.value);
      }
    });

    return values;
  }
}

export default MinervaTuple;
