/*global describe,it*/
import { assert } from 'chai'
import UtsHelpsApi from '../dist/UtsHelpsApi'

const api = new UtsHelpsApi()

describe('Students', () => {
  describe('#getStudents()', function() {
    this.timeout(7000)

    it('should return information about a student given an ID', done => {
      const studentId = '11692450'
      api.getStudent(studentId, (err, res) => {
        assert.isNull(err)
        assert.isTrue(res.IsSuccess)
        assert.isObject(res.Result)
        done()
      })
    })
  })
})
