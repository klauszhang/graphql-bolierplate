/**
 * naive way..for test only... replace it when in production
 * 
 */

class UserStore {
  constructor(rawData) {
    this.data = rawData;
    this.findOne = ({ username, password }) => {
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

module.exports = UserStore;
