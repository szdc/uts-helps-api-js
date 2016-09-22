/*global describe,it*/
import { assert } from 'chai'
import UtsHelpsApi from '../dist/UtsHelpsApi'

const api = new UtsHelpsApi()

describe('Workshops', function() {
  this.timeout(7000)

  describe('#getWorkshopSets()', () => {
    it('should return a list of active workshops', done => {
      api.getWorkshopSets((err, res) => {
        assert.isNull(err)
        assert.isTrue(res.IsSuccess)
        assert.isArray(res.Results)
        done()
      })
    })
  })

  describe('#searchWorkshops()', () => {
    it('should return a list of workshops that match the search parameter', done => {
      api.searchWorkshops((err, res) => {
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
