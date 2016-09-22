export default {
  endpoints: {
    misc: {
      getCampuses: '/misc/campus/{active}'
    }
  },
  methods: {
    getCampuses(active, callback) {
      if (typeof active === 'function') {
        callback = active
        active = true
      }
      this.get(this.endpoints.misc.getCampuses.replace('{active}', active), callback)
    }
  }
}
