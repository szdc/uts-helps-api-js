/*global describe,it*/
import { assert } from 'chai'
import UtsHelpsApi from '../dist/UtsHelpsApi'

const api = new UtsHelpsApi()

describe('Misc', function() {
  this.timeout(7000)

  describe('#listCampuses()', () => {
    it('should return a list of campuses', done => {
      api.getCampuses((err, res) => {
        assert.isNull(err)
        assert.isTrue(res.IsSuccess, res.DisplayMessage)
        assert.isArray(res.Results)
        done()
      })
    })
  })

  describe('#listLecturers()', () => {
    it('should return a list of lecturers', done => {
      api.getLecturers((err, res) => {
        assert.isNull(err)
        assert.isTrue(res.IsSuccess, res.DisplayMessage)
        assert.isArray(res.Results)
        done()
      })
    })
  })
})
