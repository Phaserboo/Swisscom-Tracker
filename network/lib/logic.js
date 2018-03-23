/*
 * TRACKER - A blockchain based business process optimizer
 * This is a live demo of data and transaction management for the TRACKER project
 *
 * Made by Luigi Riva
 */

'use strict';

/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/

/**
 *
 * @param {com.biz.PlaceRequest} TrackerRequest
 * @transaction
 */
function onPlaceRequest(newrequest) {
  console.log('placeRequest')

  var factory = getFactory();
  var NS = 'com.biz';

  return getParticipantRegistry(NS + '.Citizen')
    .then(function (participantRegistry) {
      return participantRegistry.exists(newrequest.owner.getIdentifier())
    })
    .then(function (exists) {
      if (exists) {
        var request = factory.newResource(NS, 'TrackerRequest', newrequest.qrCode);
        request.description = newrequest.description;
        request.type = newrequest.type;
        request.state = 'NEW';
        request.previousOfficials = [];
        request.owner = factory.newRelationship(NS, 'Citizen', newrequest.owner.getIdentifier());

        var basicEvent = factory.newEvent('com.biz', 'TrackerRequestStatusChanged');
        basicEvent.request = request;
        emit(basicEvent);

        return getAssetRegistry(request.getFullyQualifiedType())
          .then(function (assetRegistry) {
            return assetRegistry.add(request);
          });
      } else {
        throw new Error('Non existing owner cannot make a request!');
      }
    })
    .catch(function (err) {
      throw new Error(`Exception while checking the owner's existence: ${err}`);
    });
}

/**
 *
 * @param {com.biz.StartProcessingRequest} TrackerRequest
 * @transaction
 */
function onStartProcessingRequest(prRequest) {
  console.log('onStartProcessingRequest');

  if (prRequest.request.state == 'IN_PROGRESS') {
    throw new Error('This request is already IN_PROGRESS');
  }

  prRequest.request.state = 'IN_PROGRESS';
  prRequest.request.currentOfficial = prRequest.official;
  // console.log(request)

  if (prRequest.request.previousOfficials) {
    prRequest.request.previousOfficials.push(prRequest.official);
  } else {
    prRequest.request.previousOfficials = [prRequest.official];
  }

  var factory = getFactory();
  var basicEvent = factory.newEvent('com.biz', 'TrackerRequestStatusChanged');
  basicEvent.request = prRequest.request;
  emit(basicEvent);

  return getAssetRegistry('com.biz.TrackerRequest')
    .then(function (ar) {
      return ar.update(prRequest.request);
    });

}

/**
 *
 * @param {com.biz.EndProcessingRequest} TrackerRequest
 * @transaction
 */
function onEndProcessingRequest(prRequest) {
  console.log('onEndProcessingRequest');

  if (prRequest.request.state == 'WAITING_FOR_PROCESSING') {
    throw new Error('Your organization is not elaborating this request');
  }

  if (prRequest.request.state == "WORK_DONE") {
    throw new Error('This request has already been processed');
  }

  if (prRequest.request.currentOfficial.organization !== prRequest.official.organization) {
    throw new Error('Your organization is not elaborating this request');
  }

  prRequest.request.state = 'WAITING_FOR_PROCESSING';
  prRequest.request.currentOfficial = null;

  if (prRequest.request.previousOfficials) {
    prRequest.request.previousOfficials.push(prRequest.official);
  } else {
    prRequest.request.previousOfficials = [prRequest.official];
  }

  var factory = getFactory();
  var basicEvent = factory.newEvent('com.biz', 'TrackerRequestStatusChanged', prRequest.request);
  basicEvent.request = prRequest.request;
  emit(basicEvent);

  return getAssetRegistry('com.biz.TrackerRequest')
    .then(function (ar) {
      return ar.update(prRequest.request);
    });
}

/**
 *
 * @param {com.biz.SetupDemo} setupDemo
 * @transaction
 */
function setupDemo(setupDemo) {
  var factory = getFactory();
  var NS = 'com.biz';

  var citizens = [
    factory.newResource(NS, 'Citizen', 'badguy@gmail.com'),
    factory.newResource(NS, 'Citizen', 'nicegirl@yahoo.com')
  ];

  var organizations = [
    factory.newResource(NS, 'Organization', 'Organization_A'),
    factory.newResource(NS, 'Organization', 'Organization_B')
  ];

  var officials = [
    factory.newResource(NS, 'Official', 'Officer007'),
    factory.newResource(NS, 'Official', 'Officer008')
  ];

  return getParticipantRegistry(NS + '.Regulator')
    .then(function (regulatorRegistry) {
      var regulator = factory.newResource(NS, 'Regulator', '0001');
      regulator.email = 'regulator@moh.com';
      regulator.firstName = 'George';
      regulator.lastName = 'Rudesome';
      return regulatorRegistry.addAll([regulator]);
    })
    .then(function () {
      return getParticipantRegistry(NS + '.Citizen');
    })
    .then(function (citizenRegistry) {
      citizens[0].firstName = "Charles";
      citizens[0].lastName = 'Stanson';
      citizens[0].address1 = 'Random Stret 23, New York';
      citizens[0].phoneNumber = '+420 607 558 487';
      citizens[1].firstName = "Benjamin";
      citizens[1].lastName = 'Bronson';
      citizens[1].address1 = 'Fancy Street 43, Prague';
      citizens[1].phoneNumber = '+420 723 517 704';
      return citizenRegistry.addAll(citizens);
    }).then(function () {
      return getParticipantRegistry(NS + '.Organization');
    })
    .then(function (organizationRegistry) {
      var i = 0;
      organizations.forEach(function (organization) {
        organization.description = 'Public Department ' + (++i);
      });
      return organizationRegistry.addAll(organizations);
    }).then(function () {
      return getParticipantRegistry(NS + '.Official');
    }).then(function (officialRegistry) {
      officials[0].firstName = "Elsa"
      officials[0].lastName = "Whitmore"
      officials[0].organization = factory.newRelationship(NS, 'Organization', organizations[0].getIdentifier());
      officials[1].firstName = "Eugene"
      officials[1].lastName = "Mckeown"
      officials[1].organization = factory.newRelationship(NS, 'Organization', organizations[1].getIdentifier());
      return officialRegistry.addAll(officials);
    });
}

/*eslint-enable no-unused-vars*/
/*eslint-enable no-undef*/