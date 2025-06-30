// Lapsula Calendar & Booking API Integration
export class LapsulaAPI {
  constructor() {
    this.baseUrl = import.meta.env.VITE_LAPSULA_API_URL || 'https://api.lapsula.com/v1';
    this.apiKey = import.meta.env.VITE_LAPSULA_API_KEY;
  }

  // Get wizard's available time slots
  async getAvailableSlots(wizardLapsulaId, date) {
    try {
      // In production, this would make an API call to Lapsula
      const response = await fetch(`${this.baseUrl}/calendars/${wizardLapsulaId}/slots`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        params: {
          date: date,
          duration: 60, // 1 hour sessions
          timezone: 'UTC'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching available slots:', error);
      
      // Return mock data for development
      return {
        date: date,
        slots: [
          { time: '09:00', available: true },
          { time: '10:00', available: true },
          { time: '11:00', available: false },
          { time: '14:00', available: true },
          { time: '15:00', available: true },
          { time: '16:00', available: true }
        ]
      };
    }
  }

  // Create a booking
  async createBooking(bookingData) {
    try {
      const response = await fetch(`${this.baseUrl}/bookings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          calendar_id: bookingData.wizardLapsulaId,
          start_time: `${bookingData.date}T${bookingData.time}:00`,
          duration: 60,
          attendee: {
            name: bookingData.attendeeName,
            email: bookingData.attendeeEmail,
            phone: bookingData.attendeePhone
          },
          session_type: bookingData.sessionType,
          notes: bookingData.notes,
          metadata: {
            wizard_id: bookingData.wizardId,
            seeker_id: bookingData.seekerId,
            session_price: bookingData.price
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      
      // Return mock booking for development
      return {
        booking_id: `lapsula_${Date.now()}`,
        status: 'confirmed',
        meeting_link: 'https://meet.lapsula.com/wizard-session-123',
        calendar_event_id: 'cal_event_123',
        payment_required: true,
        payment_url: 'https://pay.lapsula.com/session-123'
      };
    }
  }

  // Process payment for booking
  async processPayment(bookingId, paymentData) {
    try {
      const response = await fetch(`${this.baseUrl}/bookings/${bookingId}/payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          payment_method: paymentData.paymentMethod,
          amount: paymentData.amount,
          currency: paymentData.currency || 'USD',
          card_token: paymentData.cardToken,
          billing_address: paymentData.billingAddress
        })
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error processing payment:', error);
      
      // Return mock payment success for development
      return {
        payment_id: `pay_${Date.now()}`,
        status: 'completed',
        transaction_id: `txn_${Date.now()}`,
        receipt_url: 'https://receipts.lapsula.com/payment-123'
      };
    }
  }

  // Get booking details
  async getBooking(bookingId) {
    try {
      const response = await fetch(`${this.baseUrl}/bookings/${bookingId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching booking:', error);
      return null;
    }
  }

  // Cancel booking
  async cancelBooking(bookingId, reason) {
    try {
      const response = await fetch(`${this.baseUrl}/bookings/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reason: reason,
          refund: true
        })
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Error canceling booking:', error);
      throw error;
    }
  }

  // Reschedule booking
  async rescheduleBooking(bookingId, newDateTime) {
    try {
      const response = await fetch(`${this.baseUrl}/bookings/${bookingId}/reschedule`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          new_start_time: newDateTime
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reschedule booking');
      }

      return await response.json();
    } catch (error) {
      console.error('Error rescheduling booking:', error);
      throw error;
    }
  }
}

// Helper functions for React components
export const lapsulaHelpers = {
  // Format date for Lapsula API
  formatDate(date) {
    return date.toISOString().split('T')[0];
  },

  // Parse Lapsula datetime
  parseDateTime(lapsulaDateTime) {
    return new Date(lapsulaDateTime);
  },

  // Get meeting link from booking
  getMeetingLink(booking) {
    return booking.meeting_link || booking.zoom_link || booking.meet_link;
  },

  // Check if booking can be cancelled
  canCancelBooking(booking) {
    const now = new Date();
    const bookingTime = new Date(booking.start_time);
    const hoursDifference = (bookingTime - now) / (1000 * 60 * 60);
    
    return hoursDifference > 24; // Can cancel if more than 24 hours away
  },

  // Check if booking can be rescheduled
  canRescheduleBooking(booking) {
    const now = new Date();
    const bookingTime = new Date(booking.start_time);
    const hoursDifference = (bookingTime - now) / (1000 * 60 * 60);
    
    return hoursDifference > 48; // Can reschedule if more than 48 hours away
  }
};

export default LapsulaAPI;