import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';

const Calendar = ({ onSelect }) => {
  const datepickerRef = useRef(null);
  const date =new Date(Date)

  useEffect(() => {
    $(datepickerRef.current).datepicker({
      autoclose: true,
      todayHighlight: true,
      format: 'dd-mm-yyyy',
      endDate: 'Od'
    }).on('changeDate', function (e) {
      const selectedDate = e.date;
      onSelect(selectedDate);
    });
  }, [onSelect]);

  return (
    <div className="input-group">
      {/* <input ref={datepickerRef} type="text" className="form-control calendarCustom" /> */}
      <div className="input-group-append">
        <span className="btn btn-light" ref={datepickerRef}>
        <FontAwesomeIcon icon={faCalendar} />
        </span>
      </div>
    </div>
  );
};

export default Calendar;
