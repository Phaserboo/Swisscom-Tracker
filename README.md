# TRACKER - A blockchain based business process optimizer

> This is a live demo of data and transaction management for the TRACKER project

This business network defines:

**Participants**
`Citizen` `Regulator` `Organization`

**Assets**
`TrackerRequest`

**Transactions**
`PlaceRequest` `StartProcessingRequest` `EndProcessingRequest`

Each Citizen can submit a TrackerRequest request identified by an unique qrCode. An organization can start processing a request and, after processing, can end its work on the request itself. Every steps in the request process flow will be tracked and timestamped in order to provide process flow overview and process performance monitoring informations.

To test this Business Network Definition in the **Test** tab:

Submit a `SetupDemo` transaction:

```
{
  "$class": "com.biz.SetupDemo"
}
```

This transaction populates the Participant Registries with two `Citizen` participants, a `Regulator` participant and two `Organization` participants. 

Submit a `PlaceRequest` transaction:

```
{
  "$class": "com.biz.PlaceRequest",
  "qrCode": "REQ_1",
  "description": "Request for a new passport",
  "type": "PASSPORT_RENEWAL",
  "owner": "resource:com.biz.Citizen#CITIZEN_1"
}
```

`ORGANIZATION_1` will receive the request and start processing it.

Submit a `StartProcessingRequest` transaction:

```
{
  "$class": "com.biz.StartProcessingRequest",
  "request": "resource:com.biz.TrackerRequest#REQ_1",
  "organization": "resource:com.biz.Organization#ORGANIZATION_1"
}
```

Once `ORGANIZATION_1` has ended processing the request 

Submit a `EndProcessingRequest` transaction:

```
{
  "$class": "com.biz.EndProcessingRequest",
  "request": "resource:com.biz.TrackerRequest#REQ_1",
  "organization": "resource:com.biz.Organization#ORGANIZATION_1"
}
```

`ORGANIZATION_2` will receive the request and start processing it

Submit a `StartProcessingRequest` transaction:

```
{
  "$class": "com.biz.StartProcessingRequest",
  "request": "resource:com.biz.TrackerRequest#REQ_1",
  "organization": "resource:com.biz.Organization#ORGANIZATION_2"
}
```

Looking into the TransactionRequest `REQ_1` details is possible to see that the current organization processing the request is `ORGANIZATION_2` and that the request, owned by `CITIZEN_1`, has been previosly processed by `ORGANIZATION_1`

This is how REQ_1 looks like after this demo:

```
{
  "$class": "com.biz.TrackerRequest",
  "qrCode": "REQ_1",
  "description": "Request for a new passport",
  "type": "PASSPORT_RENEWAL",
  "state": "IN_PROGRESS",
  "currentOrganization": {
    "$class": "com.biz.Organization",
    "sbi": "ORGANIZATION_2",
    "description": "Public Department"
  },
  "previousOrganizations": [
    {
      "$class": "com.biz.Organization",
      "sbi": "ORGANIZATION_1",
      "description": "Public Department"
    }
  ],
  "owner": "resource:com.biz.Citizen#CITIZEN_1"
}
```

Enjoy!
