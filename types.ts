import { ParsedUrlQuery } from 'querystring';

export interface ServerData {
  events_categories: EventsCategories;
  allEvents: AllEvents;
}

export type AllEvents = OneEvent[];
export type EventsCategories = EventsCategory[];

export interface EventsCategory {
  id: EventId;
  title: EventTitle;
  description: EventDescription;
  image: EventImage;
}

export interface OneEvent {
  id: EventId;
  title: EventTitle;
  description: EventDescription;
  image: EventImage;
  city: string;
  emails_registered: string[];
}

type EventId = string;
type EventTitle = string;
type EventDescription = string;
type EventImage = string;

export interface ParsedPageId extends ParsedUrlQuery {
  id: string;
}

export interface ParsedPageCat extends ParsedUrlQuery {
  cat: string;
}
