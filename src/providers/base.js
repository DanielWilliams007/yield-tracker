class BaseProvider {
  constructor(name) {
    this.name = name;
    this.data = {};
  }

  async fetchData() {
    throw new Error('fetchData must be implemented');
  }

  getData() {
    return this.data;
  }
}

module.exports = BaseProvider;