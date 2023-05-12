import IEntity from './IEntity.js';

class TagEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.text = '';
  }
}

export default TagEntity;
