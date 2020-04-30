export type noop = () => void

/* JS Events */
export interface JSEvent {
    target: {
        value: any
    }
}

/* Intl.dateTimeFormat() fix */
export interface DateTimeFormatOptions {
        localeMatcher?: string;
        weekday?: string;
        era?: string;
        year?: string;
        month?: string;
        day?: string;
        hour?: string;
        minute?: string;
        second?: string;
        timeZoneName?: string;
        formatMatcher?: string;
        hour12?: boolean;
        timeZone?: string;
        dayPeriod?: string;
    }

