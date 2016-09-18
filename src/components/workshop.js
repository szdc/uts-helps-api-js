export default {
  endpoints: {
    workshop: {
      getSets: '/workshop/workshopSets/{active}'
    }
  },
  methods: {
    getWorkshopSets(active, callback) {
      if (typeof active === 'function') {
        callback = active
        active = true
      }
      this.get(this.endpoints.workshop.getSets.replace('{active}', active), callback)
    }
  }
}
