import React, { useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker } from "react-dates";
import { settings } from "../settings";

type DatePickerProps = {
  startDate: string | null;
  endDate: string | null;
  onDateChange: (startDate: string, endDate: string) => void;
  title?: string;
};
export function DatePicker({
  startDate,
  endDate,
  onDateChange,
  title,
}: DatePickerProps) {
  // convert initial dates to moment objects
  const initialStartDateMoment = moment(startDate, settings.dateFormat);
  const initialEndDateMoment = moment(endDate, settings.dateFormat);

  // we keep internal date picker state in order to trigger onDateChange only if both dates are selected
  const [startDateMoment, setStartDateMoment] = useState<Moment | null>(
    initialStartDateMoment
  );
  const [endDateMoment, setEndDateMoment] = useState<Moment | null>(
    initialEndDateMoment
  );
  const [focusedInput, setFocusedInput] = useState<
    "startDate" | "endDate" | null
  >(null);

  function handleDateChange(
    startDateMoment: Moment | null,
    endDateMoment: Moment | null
  ): void {
    setStartDateMoment(startDateMoment);
    setEndDateMoment(endDateMoment);

    // trigger external event only if range selected
    if (startDateMoment && endDateMoment) {
      const startDate = startDateMoment
        ? startDateMoment.format(settings.dateFormat)
        : "";
      const endDate = endDateMoment
        ? endDateMoment.format(settings.dateFormat)
        : "";

      onDateChange(startDate, endDate);
    }
  }

  return (
    <DatePickerWrapper title={title}>
      <DateRangePicker
        inputIconPosition="before"
        showDefaultInputIcon={true}
        small={true}
        noBorder={true}
        displayFormat={settings.dateFormat}
        startDate={startDateMoment}
        startDateId="start_date_id"
        endDate={endDateMoment}
        endDateId="end_date_id"
        isOutsideRange={restrictDates(startDateMoment)}
        onDatesChange={function ({ startDate, endDate }) {
          handleDateChange(startDate, endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={function (focusedInput) {
          setFocusedInput(focusedInput);
        }}
      />
    </DatePickerWrapper>
  );
}

function restrictDates(startDate: Moment | null): (date: Moment) => boolean {
  return function restrictDatesInternal(date: Moment): boolean {
    const isAfterToday: boolean = date.isAfter(moment());
    // restrict end date of range by start date + max range from settings
    const isOutOfRangeOfStartDate: boolean = startDate
      ? date.isAfter(startDate.clone().add(settings.maxRangeInMonths, "month"))
      : false;

    return isAfterToday || isOutOfRangeOfStartDate;
  };
}

const DatePickerWrapper = styled.div`
  .DateRangePickerInput_calendarIcon {
    margin-right: -5px;

    svg {
      fill: ${(props) => props.theme.mainColor};
    }
  }
  .DateInput_input__focused {
    border-color: ${(props) => props.theme.mainColor};
  }
  .DayPickerKeyboardShortcuts_show__bottomRight::before {
    border-right: 33px solid ${(props) => props.theme.mainColor};
  }
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${(props) => props.theme.mainColor};
    border: 1px double ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.whiteColor};
  }

  .CalendarDay__selected_span {
    background: ${(props) => props.theme.mainLightColor};
    border: 1px double ${(props) => props.theme.mainLightColor};
    color: ${(props) => props.theme.whiteColor};
  }
`;
