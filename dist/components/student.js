'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  endpoints: {
    student: {
      get: '/student/{id}',
      register: '/student/register'
    }
  },
  methods: {
    getStudent: function getStudent(id, callback) {
      this.get(this.endpoints.student.get.replace('{id}', id), callback);
    },
    registerStudent: function registerStudent(details, callback) {
      var keyMap = {
        id: 'StudentId',
        dateOfBirth: 'DateOfBirth',
        gender: 'Gender',
        degree: 'Degree',
        status: 'Status',
        firstLanguage: 'FirstLanguage',
        countryOrigin: 'CountryOrigin',
        background: 'Background',
        degreeDetails: 'DegreeDetails',
        altContact: 'AltContact',
        preferredName: 'PreferredName',
        hsc: 'HSC',
        hscMark: 'HSCMark',
        ielts: 'IELTS',
        ieltsMark: 'IELTSMark',
        toefl: 'TOEFL',
        toeflMark: 'TOEFLMark',
        tafe: 'TAFE',
        tafeMark: 'TAFEMark',
        cult: 'CULT',
        cultMark: 'CULTMark',
        insearchDeep: 'InsearchDEEP',
        insearchDeepMark: 'InsearchDEEPMark',
        insearchDiploma: 'InsearchDiploma',
        insearchDiplomaMark: 'InsearchDiplomaMark',
        foundationCourse: 'FoundationCourse',
        foundationCourseMark: 'FoundationCourseMark',
        creatorId: 'CreatorId'
      };
      var newKeys = {};
      Object.keys(details).forEach(function (key) {
        var mappedKey = keyMap[key];
        if (keyMap[key]) {
          newKeys[mappedKey] = details[key];
        } else {
          newKeys[key] = details[key];
        }
      });
      this.post(this.endpoints.student.register, {
        form: newKeys
      }, callback);
    }
  }
};