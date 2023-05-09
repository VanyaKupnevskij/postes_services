import IEntity from './IEntity.js';

class PostEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.title = '';
    this.text = '';
  }
}

export default PostEntity;
