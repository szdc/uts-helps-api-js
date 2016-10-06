'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  endpoints: {
    session: {
      getTypes: '/session/sessionTypes/{active}',
      searchBookings: '/session/booking/search',
      updateBooking: '/session/booking/update'
    }
  },
  methods: {
    /**
     * Retrieves a list of session types.
     *
     * @param active
     * @param callback
     */
    getSessionTypes: function getSessionTypes(active, callback) {
      if (typeof active === 'function') {
        callback = active;
        active = true;
      }
      this.get(this.endpoints.session.getTypes.replace('{active}', active), callback);
    },


    /**
     * Retrieves a list of session bookings that meet the specified criteria.
     *
     * @param params
     * @param callback
     */
    searchSessionBookings: function searchSessionBookings(params, callback) {
      if (typeof params === 'function') {
        callback = params;
        params = {};
      }
      this.get(this.endpoints.session.searchBookings, {
        query: params
      }, callback);
    },


    /**
     * Updates a session booking.
     *
     * @param params
     * @param callback
     */
    updateSessionBooking: function updateSessionBooking(params, callback) {
      this.put(this.endpoints.session.updateBooking, {
        form: params
      }, callback);
    }
  }
};