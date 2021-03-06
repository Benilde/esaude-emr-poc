'use strict';

angular.module('clinic')
  .controller('PatientHeaderController', ["$rootScope", "$scope", "$filter", "$stateParams", "patientService", "encounterService", "observationsService", "commonService",
    function ($rootScope, $scope, $filter, $stateParams, patientService, encounterService, observationsService, commonService) {
      var patientUuid;

      (function () {
        patientUuid = $stateParams.patientUuid;
      })();

      var patientPrescriptions = [];

      //TODO: Add patientState Tests, fix followup refresh scope issue
      $scope.initPatientState = function () {
        var labEncounterUuid = "e2790f68-1d5f-11e0-b929-000c29ad1d07";
        var conceptsLabs = ["e1e68f26-1d5f-11e0-b929-000c29ad1d07",
          "e1d6247e-1d5f-11e0-b929-000c29ad1d07"];

        var seriesLabs = [$filter('translate')('CLINIC_PATIENT_CD4_COUNT'),
          $filter('translate')('CLINIC_PATIENT_HIV_VIRAL_LOAD')];
        var name = "labResults";

        encounterService.getEncountersForEncounterType(patientUuid, labEncounterUuid)
          .success(function (data) {
<<<<<<< HEAD
            var filteredLabs = filterObs(data, conceptsLabs, seriesLabs, name);
            $scope.patientStates = createStateData(filteredLabs, conceptsLabs, seriesLabs, name);
          });

        //TODO: Fix concept translation reference and synonyms, answers
        var conceptsTreatment = ["e1d9f7a2-1d5f-11e0-b929-000c29ad1d07",
          "e1d9ee10-1d5f-11e0-b929-000c29ad1d07",
          "e1d9ead2-1d5f-11e0-b929-000c29ad1d07",
          "e1de8862-1d5f-11e0-b929-000c29ad1d07",
          "e1d85906-1d5f-11e0-b929-000c29ad1d07",
          "e2404d72-1d5f-11e0-b929-000c29ad1d07",
          "e1d9ef28-1d5f-11e0-b929-000c29ad1d07",
          "e1d83e4e-1d5f-11e0-b929-000c29ad1d07"];

        var seriesFollowUp = [$filter('translate')('TUBERCULOSIS_PROPHYLAXIS_STARTED'),
          $filter('translate')('ANTIRETROVIRAL PLAN'),
          $filter('translate')('HISTORICAL_DRUG_START_DATE'),
          $filter('translate')('TUBERCULOSIS_DRUG_TREATMENT_START_DATE'),
          $filter('translate')('TUBERCULOSIS_DRUG_TREATMENT_START_DATE'),
          $filter('translate')('ANTIRETROVIRAL_PLAN'),
          $filter('translate')('REGIMEN')];

        var adultFollowupEncounterUuid = "e278f956-1d5f-11e0-b929-000c29ad1d07";//TODO: create in configuration file
        var childFollowupEncounterUuid = "e278fce4-1d5f-11e0-b929-000c29ad1d07";//TODO: create in configuration file

        var patient = commonService.deferPatient($rootScope.patient);
        var patientPrescriptions = [];
=======

            if (data.results.length != 0) {
              var filteredLabs = filterObs(data, conceptsLabs, seriesLabs, name);
              $scope.patientStates = createStateData(filteredLabs, conceptsLabs, seriesLabs, name);
            } else {
              $scope.nopatientState = "CLINICAL_OBSERVATIONS_INFO_EMPTY";
            }
          });

        //TODO: Fix concept translation reference and synonyms, answers
        var conceptsTreatment = [
          "e1e53c02-1d5f-11e0-b929-000c29ad1d07",
          "e1d9fbda-1d5f-11e0-b929-000c29ad1d07",
          "e1d83d4a-1d5f-11e0-b929-000c29ad1d07"
        ];

        var seriesFollowUp = [
          $filter('translate')('CURRENT_WHO_HIV_STAGE'),
          $filter('translate')('TUBERCULOSIS_TREATMENT_PLAN'),
          $filter('translate')('PREVIOUS_ANTIRETROVIRAL_DRUGS_USED_FOR_TREATMENT')];

        var adultFollowupEncounterUuid = Bahmni.Common.Constants.adultFollowupEncounterUuid;
        var childFollowupEncounterUuid = Bahmni.Common.Constants.childFollowupEncounterUuid;

        var patient = commonService.deferPatient($rootScope.patient);
>>>>>>> e1620b201cc7ef8b73ba9d5268443d9eaa3c6a6d

        encounterService.getEncountersForEncounterType(patient.uuid,
          (patient.age.years >= 15) ? adultFollowupEncounterUuid : childFollowupEncounterUuid)
          .success(function (data) {
<<<<<<< HEAD
            patientPrescriptions = commonService.filterGroupReverseFollowupObs("e1d9ef28-1d5f-11e0-b929-000c29ad1d07", data.results);

            var filteredFollowup = filterObs(data, conceptsTreatment, seriesFollowUp, "followUp");
            var encounterType = ((patient.age.years >= 15) ? adultFollowupEncounterUuid : childFollowupEncounterUuid);
            $scope.patientFollowups = createStateData(filteredFollowup, conceptsTreatment, seriesFollowUp, "followUp");


            $scope.patientPrescriptions = patientPrescriptions[0];
=======
            patientPrescriptions = commonService.filterGroupReverseFollowupObs(conceptsTreatment, data.results);

            if (data.results.length != 0) {
              $scope.patientPrescription = filterObs(data, conceptsTreatment, seriesFollowUp, "followUp");
            } else {
              $scope.noWHOStage = "CLINICAL_WHO_STAGE_EMPTY";
            }
            //TODO: Add infant and pregnant women
            var encounterType = ((patient.age.years >= 15) ? adultFollowupEncounterUuid : childFollowupEncounterUuid);

>>>>>>> e1620b201cc7ef8b73ba9d5268443d9eaa3c6a6d
          });
      };

      var filterObs = function (data, concepts) {

        var nonRetired = encounterService.filterRetiredEncoounters(data.results);

        var sliced = _.slice(nonRetired, 0, 9);

        _.forEach(sliced, function (encounter) {
          encounter.obs = observationsService.filterByList(encounter.obs, concepts);
        });
<<<<<<< HEAD
        var filtered = _.filter(sliced, function (encounter) {
          return !_.isEmpty(encounter.obs);
        });

        return filtered;
=======
        return _.filter(sliced, function (encounter) {
          return !_.isEmpty(encounter.obs);
        });
>>>>>>> e1620b201cc7ef8b73ba9d5268443d9eaa3c6a6d
      };

      var createStateData = function (encounters, concepts, seriesLabs, state) {
        var patientStates = [];
        $scope[state + "dates"] = [];
        $scope[state + "seriesLabs"] = seriesLabs;
        var data = [];

        _.forEach(encounters, function (encounter) {
          $scope[state + "dates"].push($filter('date')(encounter.encounterDatetime, "MMM d, y"));
          _.forEach(concepts, function (concept, key) {
            var found = _.find(encounter.obs, function (obs) {
              return obs.concept.uuid === concept;
            });
            if (typeof data[key] === 'undefined') data[key] = [];
            data[key].push((found) ? found.value : null);
          });
        });
<<<<<<< HEAD
        var lastDate = $scope[state + "dates"].length - 1;
        $scope.labDate = $scope[state + "dates"][lastDate];
        $scope[state + "Data"] = data;
        var lastObs = (data.length) - 1;

        angular.forEach(seriesLabs, function (value, key) {
          var exam = value;
          var result = data[key][lastObs];
          var state = {"exam": exam, "result": result};
          patientStates.push(state);
        });

=======

        var datesArraySize = $scope[state + "dates"].length;
        var lastDate = 0;
        if (datesArraySize != 0)
          lastDate = datesArraySize - 1;

        $scope.labDate = $scope[state + "dates"][lastDate];
        $scope[state + "Data"] = data;

        var obsArraySize = data[0].length;
        var lastObs = 0;
        if (obsArraySize != 0) {
          lastObs = obsArraySize - 1;
          angular.forEach(seriesLabs, function (value, key) {
            var exam = value;
            var result = data[key][lastObs];
            var state = {"exam": exam, "result": result};
            patientStates.push(state);
          });
        }
>>>>>>> e1620b201cc7ef8b73ba9d5268443d9eaa3c6a6d
        return patientStates;
      }
    }
  ]);
