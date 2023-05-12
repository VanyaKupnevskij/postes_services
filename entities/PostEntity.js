import IEntity from './IEntity.js';
import FacebookInfoEntity from './FacebookInfoEntity.js';
import TelegramInfoEntity from './TelegramInfoEntity.js';

class PostEntity extends IEntity {
  constructor(uid) {
    super(uid, facebook_uid, telegram_uid);

    this.title = '';
    this.text = '';
    this.created = new Date(Date.now());
    this.modified = new Date(Date.now());
    this.facebook_info = new FacebookInfoEntity(facebook_uid);
    this.telegram_info = new TelegramInfoEntity(telegram_uid);
  }
}

export default PostEntity;
