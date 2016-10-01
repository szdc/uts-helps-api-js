export default {
  endpoints: {
    workshop: {
      createBooking: '/workshop/booking/create',
      getSets: '/workshop/workshopSets/{active}',
      search: '/workshop/search'
    }
  },
  methods: {

    getWorkshopSets(active, callback) {
      if (typeof active === 'function') {
        callback = active
        active = true
      }
      this.get(this.endpoints.workshop.getSets.replace('{active}', active), callback)
    },

    searchWorkshops(params, callback) {
      if (typeof params === 'function') {
        callback = params
        params = {}
      }
      this.get(this.endpoints.workshop.search, {
        query: params
      }, callback)
    },

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
