
export interface City {
  id: string;
  name: string;
}

export interface State {
  id: string;
  name: string;
  cities: City[];
}

export interface Country {
  id: string;
  name: string;
  states: State[];
}
