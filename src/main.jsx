import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import QualTimes from './QualTimes.jsx'
import axios from 'axios';

const Main = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQualTimes = async () => {
      try {
        const response = await axios.get('https://agilityliit.ee/wp-json/bookings/v1/broneeringud');
        const eventBookings = response.data.map((booking) => ({
          title: booking.name,
          start: booking.startDate,
          end: booking.endDate,
          qualTime: booking.qualTime,
          referee: booking.referee,
          competitionClasses: booking.competitionClasses,
          competitionType: booking.competitionType,
          description: booking.info,
          location: booking.location,
          status: booking.status
        }));
        setEvents(eventBookings);
      } catch (error) {
        console.error('Error fetching qual times:', error);
        setError('Failed to load qual times');
      } finally {
        setLoading(false);
      }
    };
    fetchQualTimes();
  }, [])

  return (
    <>
      <QualTimes 
        events={events}
        loading={loading}
        error={error}
      />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('agility_qual_times')).render(<Main />);
