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
      api.searchWorkshops({workshopSetId: 3}, (err, res) => {
        res.Results.forEach(r => {
          console.log(`Workshop ID: ${r.WorkshopId}`)
        })
        assert.isNull(err)
        assert.isTrue(res.IsSuccess, res.DisplayMessage)
        assert.isArray(res.Results)
        done()
      })
    })
  })

  describe('#createWorkshopBooking()', () => {
    it('should return success given a successful booking', done => {
      const studentId = '11692946'
      const workshopId = 53
      const userId = -1
      api.createWorkshopBooking(workshopId, studentId, userId, (err, res) => {
        assert.isNull(err)
        assert.isTrue(res.IsSuccess, res.DisplayMessage)
        done()
      })
    })
  })

  describe('#createWorkshopWaiting()', () => {
    it('should return success given a successful wait list entry', done => {
      const studentId = '11692946'
      const workshopId = 8
      const userId = -1
      api.createWorkshopWaiting(workshopId, studentId, userId, (err, res) => {
        assert.isNull(err)
        assert.isTrue(res.IsSuccess, res.DisplayMessage)
        done()
      })
    })
  })

  describe('#cancelWorkshopBooking()', () => {
    it('should return success given a successful cancellation', done => {
      const studentId = '11692946'
      const workshopId = 53
      const userId = -1
      api.cancelWorkshopBooking(workshopId, studentId, userId, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res)
        }
        assert.isNull(err)
        assert.isTrue(res.IsSuccess, res.DisplayMessage)
        done()
      })
    })
  })

  describe('#updateWorkshopBooking()', () => {
    it('should return success given a successful update', done => {
      const params = {
        studentId: '11692946',
        workshopId: 53,
        userId: -1,
        attended: 1
      }
      api.updateWorkshopBooking(params, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res)
        }
        assert.isNull(err)
        assert.isTrue(res.IsSuccess, res.DisplayMessage)
        done()
      })
    })
  })

  describe('#searchWorkshopBookings()', () => {
    it('should return a list of workshop bookings that match the search parameter', done => {
      api.searchWorkshopBookings({studentId: '11692946'}, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res)
        }
        assert.isNull(err)
        assert.isTrue(res.IsSuccess, res.DisplayMessage)
        assert.isArray(res.Results)
        done()
      })
    })
  })
})
