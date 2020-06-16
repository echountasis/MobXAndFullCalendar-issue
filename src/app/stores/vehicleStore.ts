import { action, runInAction, observable, decorate } from "mobx";
import { EventInput } from "@fullcalendar/core";
import { RootStore } from "./rootStore";

export class VehicleStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable loading?: boolean = undefined;
    @observable currentDate: Date = new Date();
    @observable currentViewName: string = 'Week';
    @observable events: EventInput[] = [];
    @observable popupIsOpen: boolean = false;

    @action updateEvent(event: EventInput) {
        console.log('id:' + event.id);
        console.log('allDay:' + event.allDay);
        console.log('start:' + event.start);
        console.log('end:' + event.end);
    }

    @action editEvent(event: EventInput) {
        this.popupIsOpen = true;
        console.log('id:' + event.id);
        console.log('allDay:' + event.allDay);
        console.log('start:' + event.start);
        console.log('end:' + event.end);
    }

    @action createEvent(event: any) {
        console.log(event);

        this.events.push({
            id: `${new Date().getTime()}`,
            title: 'test',
            start: event.start,
            end: event.end,
            allDay: event.allDay
        })

    }

    @action loadEvents = async (dateFrom: Date, dateTo: Date) => {
        try {
            this.loading = true;

            console.log('from: ' + dateFrom);
            console.log('to: ' + dateTo);

            /*
             */
            runInAction(() => {
                this.events = [
                    {
                        id: '1',
                        title: 'Mail New Leads for Follow Up',
                        start: '2020-06-14T00:00',
                        end: '2020-06-18T23:59',
                        allDay: true,
                        extendedProps: {
                            description: 'this is all day event description'
                        }
                    },
                    {
                        id: '3',
                        title: 'Product Meeting',
                        start: '2020-06-15T10:30',
                        end: '2020-06-15T11:30',
                        extendedProps: {
                            description: 'this is an event event description'
                        }
                    },
                    {
                        id: '2',
                        title: 'Send Territory Sales Breakdown',
                        startTime: '14:00',
                        endTime: '16:00',
                        color: 'green',
                        startRecur: '2020-06-01',
                        endRecur: '2020-06-21',
                        daysOfWeek: [1, 2, 3]
                    },
                ];
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }
}