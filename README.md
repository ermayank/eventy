
# Eventy - Event Management and Survey System


## About

Eventy is the web application tool for organizing the successful event. Managing the event is the arduous responsibility irrespective of the event type. Along with that it is crucial to gather important feedback from the attendee to analyze the principal elements for future references. Event feeds enhance audience engagement and make the event a trend. This can be accomplished by putting event management systems into practice that can tackle complexities with ease. Our overall goal is to create an event management and survey system that makes things easy for organizers as well attendees. This will make sure that the users have the appropriate level of knowledge and details about your objectives of the event. It will eventually help to eliminate the chances of missing any important events and provide easy accessibility of event information.

#### Key features of Eventy

- it is a chaotic event management and survey system for event organizers. For that purpose the admin can supervise the participant, events and Survey analysis.
- Easy accessibility of event information for attendees so that they can register for the event of their choice effortlessly.
- Collecting qualitative data in the form of feedback from the attendee for a post event survey.
- Eliminates the chances of missing any major events.
- Attracting the volume of people for the event.
- It provide effective for the admin to analyze the event after its completion which is otherwise a strenuous and time consuming job.

## Built With

- M.E.R.N stack
- Amazon AWS
- Docker
- Github Actions

## Getting Started

### Prerequisites

In order to run this web application the docker need to be installed in the system.

##### Docker Pull Command
   - Front End 
        ```bash
        docker pull mguptaca/poc_frontend
        ```

  - Back End
     ```bash
    docker pull mguptaca/poc_backend
    ```


## Event Data Model

```bash
  {
  "_id": ObjectId,
  "event_type": String,
  "available_seats": Integer,
  "cost": Double,
  "paymentDone": Boolean,
  "participants": Array
  "paid": Boolean,
  "event_host": String,
  "venue": String,
  "paymentData": Object,
  "title": String,
  "survey":Array,
  "datetime": Timestamp,
  "description": String
  "published_at": Timestamp,
  "createdAt": Timestamp,
  "updatedAt":Timestamp,m
  "__v": Double,
  "banner_image":ObjectId,
  "created_by": {
    "$oid": ObjectId
  }
  "updated_by":  {
    "$oid": ObjectId
  }
}
```
