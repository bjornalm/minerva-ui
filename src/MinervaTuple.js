class MinervaTuple {
  constructor(rawTuple) {
    this.attributes = rawTuple.map(attr => {
      const type = Object.keys(attr)[0];
      const value = attr[type];
      return { type, value };
    });
  }

  clone() {
    const tuple = new MinervaTuple([]);
    tuple.attributes = JSON.parse(JSON.stringify(this.attributes));
    return tuple;
  }

  // Helper functions since we don't know the order of the "columns" in a relation
  // described in Form-Tuples format. E.g. form: ["shape", "component", "position"] and
  //  form: ["component", "shape", "position"] describe the same relations.
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
