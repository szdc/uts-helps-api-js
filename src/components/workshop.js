export default {
  endpoints: {
    workshop: {
      cancelBooking: '/workshop/booking/cancel',
      createBooking: '/workshop/booking/create',
      createWaiting: '/workshop/wait/create',
      getSets: '/workshop/workshopSets/{active}',
      search: '/workshop/search',
      searchBookings: '/workshop/booking/search',
      updateBooking: '/workshop/booking/update'
    }
  },
  methods: {
    /**
     * Retrieves a list of workshop sets.
     *
     * @param active
     * @param callback
     */
    getWorkshopSets(active, callback) {
      if (typeof active === 'function') {
        callback = active
        active = true
      }
      this.get(this.endpoints.workshop.getSets.replace('{active}', active), callback)
    },

    /**
     * Retrieves a list of workshop sets that meet the specified criteria.
     *
     * @param params
     * @param callback
     */
    searchWorkshops(params, callback) {
      if (typeof params === 'function') {
        callback = params
        params = {}
      }
      this.get(this.endpoints.workshop.search, {
        query: params
      }, callback)
    },

    /**
     * Creates a workshop booking.
     *
     * @param workshopId
     * @param studentId
     * @param userId
     * @param callback
     */
    createWorkshopBooking(workshopId, studentId, userId, callback) {
      this.post(this.endpoints.workshop.createBooking, {
        query: {
          workshopId,
          studentId,
          userId
        }
      }, callback)
    },

    /**
     * Creates a workshop wait list entry.
     *
     * @param workshopId
     * @param studentId
     * @param userId
     * @param callback
     */
    createWorkshopWaiting(workshopId, studentId, userId, callback) {
      this.post(this.endpoints.workshop.createWaiting, {
        query: {
          workshopId,
          studentId,
          userId
        }
      }, callback)
    },

    /**
     * Cancels a workshop booking.
     *
     * @param workshopId
     * @param studentId
     * @param userId
     * @param callback
     */
    cancelWorkshopBooking(workshopId, studentId, userId, callback) {
      this.post(this.endpoints.workshop.cancelBooking, {
        query: {
          workshopId,
          studentId,
          userId
        }
      }, callback)
    },

    /**
     * Updates a workshop booking.
     *
     * @param params
     * @param callback
     */
    updateWorkshopBooking(params, callback) {
      this.put(this.endpoints.workshop.updateBooking, {
        form: params
      }, callback)
    },

    /**
     * Retrieves a list of workshop bookings that meet the specified criteria.
     *
     * @param params
     * @param callback
     */
    searchWorkshopBookings(params, callback) {
      if (typeof params === 'function') {
        callback = params
        params = {}
      }
      this.get(this.endpoints.workshop.searchBookings, {
        query: params
      }, callback)
    }
  }
}
