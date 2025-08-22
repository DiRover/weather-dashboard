interface DailyUnits {
    time: string; // всегда "iso8601"
    temperature_2m_mean: '°C';
}

interface Daily {
    time: string[]; // массив дат в формате YYYY-MM-DD
    temperature_2m_mean: number[]; // массив температур
}

export interface WeatherDTO {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    daily_units: DailyUnits;
    daily: Daily;
}
