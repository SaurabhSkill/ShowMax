import { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectedSeats } from '../../../../../store/actions';

class TicketCountManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localTicketCount: 1
    };
  }

  static getDerivedStateFromProps(props, state) {
    // Debug logging (can be removed in production)
    // console.log('=== TICKET COUNT MANAGER DEBUG ===');
    // console.log('props.selectedSeats:', props.selectedSeats, 'type:', typeof props.selectedSeats, 'isArray:', Array.isArray(props.selectedSeats));
    // console.log('current localTicketCount:', state.localTicketCount);
    
    // Only update if selectedSeats is a valid array of seat coordinates (not ticket count)
    // Check if it's an array of seat coordinates (each element should be an array with 2 elements)
    if (Array.isArray(props.selectedSeats) && 
        props.selectedSeats.length > 0 && 
        props.selectedSeats.every(seat => Array.isArray(seat) && seat.length === 2) &&
        props.selectedSeats.length !== state.localTicketCount) {
      // console.log('Updating localTicketCount to:', props.selectedSeats.length);
      return { localTicketCount: Math.max(1, props.selectedSeats.length) };
    }
    // console.log('No state update needed');
    // console.log('================================');
    return null;
  }

  handleTicketCountChange = (count) => {
    // Debug logging (can be removed in production)
    // console.log('=== TICKET COUNT CHANGE DEBUG ===');
    // console.log('Input count:', count, 'type:', typeof count);
    const safe = Math.max(1, Math.min(10, Number(count) || 1));
    // console.log('Safe count:', safe);
    this.setState({ localTicketCount: safe });
    
    // Don't update Redux selectedSeats - keep it for actual seat selection
    // The ticket count will be used directly in the checkout process
    // console.log('================================');
  };

  render() {
    return this.props.children({
      ticketsCount: this.state.localTicketCount,
      onChangeTickets: this.handleTicketCountChange
    });
  }
}

const mapDispatchToProps = {
  setSelectedSeats
};

export default connect(null, mapDispatchToProps)(TicketCountManager);
