class IController {
  constructor(repository) {
    if (repository === undefined) {
      throw new Error('Repository not initialize for controller');
    }

    this.repository = repository;
  }
}

export default IController;
