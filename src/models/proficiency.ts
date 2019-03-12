export interface Proficiency {
    level: number;
    timeDuration: number;
    timeUnit: 'years' | 'quarters' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds';
}

export const Proficiencies: Proficiency[] = [
    { level: 0, timeDuration: 0, timeUnit: 'minutes' },
    { level: 1, timeDuration: 1, timeUnit: 'hours' },
    { level: 2, timeDuration: 1, timeUnit: 'days' },
    { level: 3, timeDuration: 2, timeUnit: 'days' },
    { level: 4, timeDuration: 3, timeUnit: 'days' },
    { level: 5, timeDuration: 5, timeUnit: 'days' },
    { level: 6, timeDuration: 1, timeUnit: 'weeks' },
    { level: 7, timeDuration: 2, timeUnit: 'weeks' },
    { level: 8, timeDuration: 3, timeUnit: 'weeks' },
    { level: 9, timeDuration: 1, timeUnit: 'months' },
    { level: 10, timeDuration: 2, timeUnit: 'months' },
    { level: 11, timeDuration: 3, timeUnit: 'months' },
];
