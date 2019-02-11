import React, { Component, Fragment } from 'react'
import EventList from '../../events'

class EventsPage extends Component {
  render() {
    return (
      <Fragment>
        <h1> Events page </h1>
        <EventList />
      </Fragment>
    )
  }
}

export default EventsPage;
