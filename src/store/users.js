class Users {
  constructor(rawData) {
    this.data = rawData;
    this.findOne = ({ username, password }) => {
      // naive way.. replace it when in production
      const user = this.data[username];
      if (user) {
        if (user.password == password) {
          return user;
        }
      }
      return null;
    };
  }
}

module.exports = Users;
