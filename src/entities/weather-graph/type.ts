interface TemperatureDailyUnits {
    temperature_2m_mean: '°C';
}

interface HourlyUnits {
    temperature_2m: '°C';
    relative_humidity_2m: '%';
}

interface Daily {
    time: string[]; // массив дат в формате YYYY-MM-DD
    temperature_2m_mean: number[]; // массив температур
}

export interface TemperatureDTO {
    daily_units: TemperatureDailyUnits;
    daily: Daily;
}

interface Hourly extends Pick<Daily, 'time'> {
    relative_humidity_2m: number[];
    temperature_2m: number[];
}

export interface TemperatureAndHumidityDTO {
    hourly: Hourly;
    hourly_units: HourlyUnits;
}
