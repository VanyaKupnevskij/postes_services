import IEntity from './IEntity.js';

class UserEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.email = '';
    this.password = '';
  }
}

export default UserEntity;
