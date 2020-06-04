/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
const { removeKeyUndefined } = require('../helpers/util');

class Repository {
  constructor(model) {
    this.collection = model;
  }

  async count() {
    return this.collection.estimateDocumentCount();
  }


  async find(query = {}, { multiple = true, count, lean } = {}, populated) {
    const results = multiple ?
      this.collection.find(query) :
      this.collection.findOne(query);
    if (count) {
      return results.countDocuments().exec();
    }
    if (lean) {
      return results.lean().exec();
    }
    if (populated) {
      return results.lean().populate(populated).exec();
    }
    return results.exec();
  }

  async create(body) {
    const document = new this.collection(body);
    return document.save();
  }

  async update(document, body = {}) {
    // eslint-disable-next-line valid-typeof
    const id = (typeof document._id !== undefined) ?
      document._id : document;
    return this.collection.findByIdAndUpdate(id, body, { new: true });
  }

  async reload(document, { select, populate, lean } = {}) {
    const isNotNecessaryReload = !select &&
    !populate &&
    !lean &&
    document instanceof this.collection;
    if (isNotNecessaryReload) {
      return document;
    }
    const option = { select, populate, lean };
    return (typeof document._id !== 'undefined') ?
      this.collection.findById(document._id, removeKeyUndefined(option)) :
      this.collection.findOne({ _id: document });
  }

  async remove(document) {
    const reloadedDocument = await this.reload(document);
    return reloadedDocument.remove();
  }
}
module.exports = Repository;
