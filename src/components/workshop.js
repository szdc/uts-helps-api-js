export default {
  endpoints: {
    workshop: {
      createBooking: '/workshop/booking/create',
      getSets: '/workshop/workshopSets/{active}',
      search: '/workshop/search'
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
        form: {
          workshopId,
          studentId,
          userId
        }
      }, callback)
    }
  }
}
