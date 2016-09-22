export default {
  endpoints: {
    workshop: {
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
        qs: params
      }, callback)
    }
  }
}
