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
function onPlaceRequest(newrequest){
  	console.log('placeRequest')
    
  	var factory = getFactory();
  	var namespace = 'com.biz';
  
  	var request = factory.newResource(namespace, 'TrackerRequest', newrequest.qrCode);
  	request.description = newrequest.description;
  	request.type = newrequest.type;
  	request.state = 'NEW';
  	request.previousOrganizations = [];
  	request.owner = factory.newRelationship(namespace, 'Citizen', newrequest.owner.getIdentifier());
  	
  // save the order
    return getAssetRegistry(request.getFullyQualifiedType()) 
      .then(function (assetRegistry) {
    return assetRegistry.add(request);
    });
}

/**
 *
 * @param {com.biz.StartProcessingRequest} TrackerRequest
 * @transaction
 */
function onStartProcessingRequest(prRequest){
    console.log('onStartProcessingRequest');
  
  	if (prRequest.request.state == 'IN_PROGRESS') {
        throw new Error('This request is already IN_PROGRESS');
    }
  
  	prRequest.request.state = 'IN_PROGRESS';
    prRequest.request.currentOrganization = prRequest.organization;
  	
    return getAssetRegistry('com.biz.TrackerRequest')
  .then(function(ar) {
      return ar.update(prRequest.request);
  });
}

/**
 *
 * @param {com.biz.EndProcessingRequest} TrackerRequest
 * @transaction
 */
function onEndProcessingRequest(prRequest){
    console.log('onEndProcessingRequest');
  
  	if (prRequest.request.state == 'WAITING_FOR_PROCESSING') {
        throw new Error('Your organization is not elaborating this request');
    }
  
  	if (prRequest.request.currentOrganization !== prRequest.organization) {
        throw new Error('Your organization is not elaborating this request');
    }
  
  	prRequest.request.state = 'WAITING_FOR_PROCESSING';
    prRequest.request.currentOrganization = null;
  
  	if (prRequest.request.previousOrganizations) {
       prRequest.request.previousOrganizations.push(prRequest.organization);
    } else {
       prRequest.request.previousOrganizations = [prRequest.organization];
    }
  	
    return getAssetRegistry('com.biz.TrackerRequest')
  .then(function(ar) {
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
        factory.newResource(NS, 'Citizen', 'CITIZEN_1'),
        factory.newResource(NS, 'Citizen', 'CITIZEN_2')
    ];

    var organizations = [
        factory.newResource(NS, 'Organization', 'ORGANIZATION_1'),
        factory.newResource(NS, 'Organization', 'ORGANIZATION_2')
    ];

    return getParticipantRegistry(NS + '.Regulator')
  .then(function(regulatorRegistry) {
      var regulator = factory.newResource(NS, 'Regulator', 'REGULATOR');
      regulator.email = 'REGULATOR';
      regulator.firstName = 'Audit';
      regulator.lastName = 'Department';
      return regulatorRegistry.addAll([regulator]);
  })
  .then(function() {
      return getParticipantRegistry(NS + '.Citizen');
  })
  .then(function(citizenRegistry) {
      citizens.forEach(function(citizen) {
          citizen.firstName = citizen.getIdentifier();
          citizen.lastName = 'Lastname';
          citizen.address1 = 'Address1';
          citizen.phoneNumber = 'PhoneNumber';
      });
      return citizenRegistry.addAll(citizens);
  }).then(function() {
      return getParticipantRegistry(NS + '.Organization');
  })
  .then(function(organizationRegistry) {
      organizations.forEach(function(organization) {
          organization.description = 'Public Department';
      });
      return organizationRegistry.addAll(organizations);
  });
}

/*eslint-enable no-unused-vars*/
/*eslint-enable no-undef*/
