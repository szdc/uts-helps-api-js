/*global describe,it*/
import { assert } from 'chai'
import UtsHelpsApi from '../dist/UtsHelpsApi'

const api = new UtsHelpsApi()

describe('Students', () => {
  describe('#getStudent()', function() {
    this.timeout(7000)

    it('should return information about a student given an ID', done => {
      const studentId = '11692946'
      api.getStudent(studentId, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res)
        }
        assert.isNull(err)
        assert.isTrue(res.IsSuccess)
        assert.isObject(res.Result)
        done()
      })
    })
  })

  describe('#registerStudent()', function() {
    this.timeout(7000)

    it('should return success if the student was created', done => {
      const details = {
        studentId: '11692946',
        dateOfBirth: '6 June 1994',
        degree: 'UG',
        status: 'Local',
        firstLanguage: 'English',
        countryOrigin: 'Australia',
        creatorId: '1'
      }
      api.registerStudent(details, (err, res) => {
        assert.isNull(err)
        assert.isTrue(res.IsSuccess)
        done()
      })
    })
  })
})
