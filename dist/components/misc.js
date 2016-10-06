'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  endpoints: {
    misc: {
      getCampuses: '/misc/campus/{active}',
      getLecturers: '/misc/lecturer/{active}'
    }
  },
  methods: {
    /**
     * Retrieves a list of campuses.
     *
     * @param active
     * @param callback
     */
    getCampuses: function getCampuses(active, callback) {
      if (typeof active === 'function') {
        callback = active;
        active = true;
      }
      this.get(this.endpoints.misc.getCampuses.replace('{active}', active), callback);
    },


    /**
     * Retrieves a list of lecturers.
     *
     * @param active
     * @param callback
     */
    getLecturers: function getLecturers(active, callback) {
      if (typeof active === 'function') {
        callback = active;
        active = true;
      }
      this.get(this.endpoints.misc.getLecturers.replace('{active}', active), callback);
    }
  }
};