import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1/all';

export interface Country {
    name: string;
    code: string;
}

export const getCountries = async (): Promise<Country[]> => {
    try {
        const response = await axios.get(API_URL);
        const countries = response.data.map(({ name, cca2 }: { name: { common: string }, cca2: string }) => ({
            name: name.common,
            code: cca2,
        }));

        countries.sort((a: { name: string; }, b: { name: string }) => a.name.localeCompare(b.name));
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        return [];
    }
};
