class IAction {
  constructor() {
    this.run = async (req, res) => {
      throw new Error('Must override .run() method');
    };

    if (this.validate === undefined) {
      throw new Error('Must override .validate() method');
    }

    if (this.accessTag === undefined) {
      throw new Error('Must override .accessTag() method');
    }
  }
}

export default IAction;
