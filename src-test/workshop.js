/*global describe,it*/
import { assert } from 'chai'
import UtsHelpsApi from '../dist/UtsHelpsApi'

const api = new UtsHelpsApi()

describe('Workshops', () => {
  describe('#getWorkshopSets()', function() {
    this.timeout(7000)

    it('should return a list of active workshops', done => {
      api.getWorkshopSets((err, res) => {
        assert.isNull(err)
        assert.isTrue(res.IsSuccess)
        assert.isArray(res.Results)
        done()
      })
    })
  })
})
