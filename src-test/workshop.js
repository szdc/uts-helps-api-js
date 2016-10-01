/*global describe,it*/
import { assert } from 'chai'
import UtsHelpsApi from '../dist/UtsHelpsApi'

const api = new UtsHelpsApi()

describe('Workshops', function() {
  this.timeout(7000)

  describe('#getWorkshopSets()', () => {
    it('should return a list of active workshops', done => {
      api.getWorkshopSets((err, res) => {
        assert.isNull(err, err.body.MessageDetail)
        assert.isTrue(res.IsSuccess)
        assert.isArray(res.Results)
        done()
      })
    })
  })

  describe('#searchWorkshops()', () => {
    it('should return a list of workshops that match the search parameter', done => {
      api.searchWorkshops({workshopSetId: 3}, (err, res) => {
        assert.isNull(err, err.body.MessageDetail)
        assert.isTrue(res.IsSuccess, res.DisplayMessage)
        assert.isArray(res.Results)
        done()
      })
    })
  })

  describe('#createWorkshopBooking()', () => {
    it('should return success given a successful booking', done => {
      api.createWorkshopBooking((err, res) => {
        assert.isNull(err, err.body.MessageDetail)
        assert.isTrue(res.IsSuccess, res.DisplayMessage)
        assert.isArray(res.Results)
        done()
      })
    })
  })
})
