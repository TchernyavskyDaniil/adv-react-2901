import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEvents, eventsSelector, eventsLoadedSelector } from '../../ducks/events'

class EventList extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    const { events, loaded } = this.props;
    console.log(events, loaded);
    return (
      <h1> Events </h1>
    )
  }
}

export default connect(
  state => ({
    events: eventsSelector(state),
    loaded: eventsLoadedSelector(state),
  }),
  { fetchEvents },
)(EventList);
