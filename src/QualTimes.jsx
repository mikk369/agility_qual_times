import { useState } from 'react'
import './App.css'

function QualTimes({ events, loading, error }) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const months = [
    'Jaanuar', 'Veebruar', 'Märts', 'Aprill',
    'Mai', 'Juuni', 'Juuli', 'August',
    'September', 'Oktoober', 'November', 'Detsember',
  ];

  // adds month names in Estonian 
  const monthNames = (event) => {
    if (event && event.start) {
      const monthIndex = new Date(event.start).getMonth();
      return months[monthIndex];
    }
    return "Kuupäev puudub";
  };

  // formats the date 
  const competitionDates = (event) => {
     return event.start && event.end ? (
      `${new Date(event.start).getDate()}.${new Date(event.start).getMonth() + 1}.${new Date(event.start).getFullYear()} - ${new Date(event.end).getDate()}.${new Date(event.end).getMonth() + 1}.${new Date(event.end).getFullYear()}`
    ) : (
      "Kuupäev puudub"
    )
  }

  // formats the qualTime 
  const formatQualTime = (event) => {
    if (event.qualTime) {
      const date = new Date(event.qualTime);
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
    return "Unknown";
  };
  
  // Dynamically extract years from events with valid qualTime
  const yearsToDisplay = Array.from(
    new Set(
      events
        .filter(event => event.qualTime && !isNaN(new Date(event.qualTime).getTime())) // Ensure qualTime is valid
        .map(event => new Date(event.qualTime).getFullYear()) // Extract year from qualTime
    )
  ).sort((a, b) => a - b); // Sort years in ascending order

  const filteredEvents = (events, selectedYear) => {
    return events.filter(
      (event) =>
        event.qualTime && // Only include events with a valid qualTime
        new Date(event.qualTime).getFullYear() === selectedYear // Filter by selected year
    ).sort((a, b) => {
      //sort months in ascending order from 0, 1 e.g. january, february in case they are inserted in random order
      const monthA = new Date(a.qualTime).getMonth();
      const monthB = new Date(b.qualTime).getMonth();

      return monthA - monthB;
    })
  };

  // Get filtered events for the selected year
  const filteredEventsList = filteredEvents(events, selectedYear);

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  // loading div
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className='qual-container'>
      <div className='year-selector'>
        {yearsToDisplay.map((year) => (
          <button
            key={year}
            className={`year-button ${selectedYear === year ? 'active' : ''}`}
            onClick={() => handleYearClick(year)}>
            {year}
          </button>
        ))}
      </div>
      {/* Event Cards Grid */}
      <div className='qual-grid-container'>
        {filteredEventsList.length > 0 ? (
          filteredEventsList.map((event, index) => (
            <div key={index} className='qual-box'>
              <h2>{monthNames(event)}</h2>
              <p className='location'>
                <b>Asukoht: </b>{event.location || "Unknown"}
              </p>
              <p className='date'>
                <b>Kuupäev: </b>{competitionDates(event)}
              </p>
              <p className='qual-time'>
                <b className='qual'>Kvalifikatsioon: </b>
                {formatQualTime(event)}
              </p>
              <p className='referee'>
                <b>Kohtunik: </b>{event.referee || "Unknown"}
              </p>
            </div>
          ))
        ) : (
          <p>Kvalifikatsiooni võistlusi pole lisatud.</p>
        )}
      </div>
    </div>
  );
}

export default QualTimes;
