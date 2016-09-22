/*global describe,it*/
import { assert } from 'chai'
import UtsHelpsApi from '../dist/UtsHelpsApi'

const api = new UtsHelpsApi()

describe('Misc', function() {
  this.timeout(7000)

  describe('#listCampuses()', () => {
    it('should return a list of campuses', done => {
      api.getCampuses((err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res)
        }
        assert.isNull(err)
        assert.isTrue(res.IsSuccess)
        assert.isArray(res.Results)
        done()
      })
    })
  })
})
