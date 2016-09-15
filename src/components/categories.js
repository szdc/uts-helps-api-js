export default {
  endpoints: {
    categories: {
      add: '/category',
      get: '/category',
      remove: '/category/{id}',
      update: '/category/{id}'
    }
  },
  methods: {
    /**
     * Get categories
     *
     * @param user
     * @param callback
     */
    getCategories(user, callback) {
      this.get(this.endpoints.categories.get, {
        user
      }, callback)
    },

    /**
     * Adds a new category.
     *
     * @param user
     * @param name
     * @param callback
     */
    addCategory(user, name, callback) {
      this.post(this.endpoints.categories.add, {
        user,
        form: {
          name
        }
      }, callback)
    },

    /**
     * Updates an existing category.
     *
     * @param user
     * @param id
     * @param name
     * @param callback
     */
    updateCategory(user, id, name, callback) {
      this.put(this.endpoints.categories.update.replace('{id}', id), {
        user,
        form: {
          name
        }
      }, callback)
    },

    /**
     * Removes an existing category.
     *
     * @param user
     * @param id
     * @param callback
     */
    removeCategory(user, id, callback) {
      this.del(this.endpoints.categories.remove.replace('{id}', id), {
        user
      }, callback)
    }
  }
}
