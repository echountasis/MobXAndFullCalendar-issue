import React, { useContext, Fragment, createRef } from "react";
import { observer, Observer } from "mobx-react-lite";
import { Dimmer, Loader } from "semantic-ui-react";
import FullCalendar, { PluginDef } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { runInAction } from "mobx";
import { RootStoreContext } from "../app/stores/rootStore";

const Scheduler = () => {
  let calendarComponentRef = React.createRef<FullCalendar>();
  const rootStore = useContext(RootStoreContext);
  const {
    events,
    loadEvents,
    updateEvent,
    loading,
    createEvent,
    popupIsOpen,
  } = rootStore.vehicleStore;

  const plugins: PluginDef[] = [
    timeGridPlugin,
    dayGridPlugin,
    listPlugin,
    interactionPlugin,
  ];

  return (
    <Fragment>
      <Dimmer active={loading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>

      <FullCalendar
        height={640}
        nowIndicator={true}
        initialView="timeGridWeek"
        editable={true}
        eventStartEditable={true}
        eventResizableFromStart={true}
        droppable={true}
        selectable={true}
        headerToolbar={{
          start: "prevYear,prev,next,nextYear today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        plugins={plugins}
        ref={calendarComponentRef}
        weekends={true}
        events={events}
        eventDrop={(data: any) => updateEvent(data.event)}
        select={(data: any) => createEvent(data)}
        eventResizeStop={(info: any) => updateEvent(info.event)}
        businessHours={[
          { daysOfWeek: [1, 2, 3, 4, 5], startTime: "8:00", endTime: "20:00" },
        ]}
        // eventClick={(data: any) => editEvent(data.event)}
        datesDidUpdate={(arg: { view: any }) => {
          loadEvents(arg.view.activeStart, arg.view.activeEnd);
        }}
        // eventRender={(info: any) => {
        //   console.log(info.el);
        //   // info.el.onClick = () => console.log("test");
        // }}
        // eventMouseEnter={(data: any) => console.log(data.event)}
        // eventMouseLeave={(data: any) => console.log(data.event)}
      />
    </Fragment>
  );
};

export default observer(Scheduler);
