/*global describe,it*/
import { assert } from 'chai'
import UtsHelpsApi from '../dist/UtsHelpsApi'

const api = new UtsHelpsApi()

describe('Sessions', function() {
  this.timeout(7000)

  describe('#getSessionTypes()', () => {
    it('should return a list of active sessions', done => {
      api.getSessionTypes((err, res) => {
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

  describe('#searchSessionBookings()', () => {
    it('should return a list of session bookings that match the search parameters', done => {
      const params = {
        studentId: '11692946'
      }
      api.searchSessionBookings(params, (err, res) => {
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

  describe('#updateSessionBooking()', () => {
    it('should return success given a successful update', done => {
      const params = {
        studentId: '11692946',
        sessionId: 53,
        userId: -1,
        attended: 1
      }
      api.updateSessionBooking(params, (err, res) => {
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
})
