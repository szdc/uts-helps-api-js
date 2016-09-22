export default {
  endpoints: {
    student: {
      get: '/student/{id}',
      register: '/student/register'
    }
  },
  methods: {
    getStudent(id, callback) {
      this.get(this.endpoints.student.get.replace('{id}', id), callback)
    }
  }
}
