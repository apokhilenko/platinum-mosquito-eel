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
};
export function DatePicker({
  startDate,
  endDate,
  onDateChange,
}: DatePickerProps) {
  const initialStartDateMoment = moment(startDate, settings.dateFormat);
  const initialEndDateMoment = moment(endDate, settings.dateFormat);

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
    <DatePickerWrapper>
      <DateRangePicker
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
    const isOutOfRangeOfStartDate: boolean = startDate
      ? date.isAfter(startDate.clone().add(settings.maxRangeInMonths, "month"))
      : false;

    return isAfterToday || isOutOfRangeOfStartDate;
  };
}

const DatePickerWrapper = styled.div`
  border: 1px solid #aaa;
`;
