import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Country, State, City } from '@/lib/types';
import { toast } from 'sonner';

export function useEntityManagement() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [view, setView] = useState<'countries' | 'states' | 'cities'>('countries');

  // Country operations
  const handleAddCountry = (name: string) => {
    const newCountry: Country = {
      id: uuidv4(),
      name,
      states: []
    };
    setCountries([...countries, newCountry]);
    toast.success(`Country "${name}" has been added`);
  };

  const handleEditCountry = (id: string, name: string) => {
    const updatedCountries = countries.map(country => 
      country.id === id ? { ...country, name } : country
    );
    setCountries(updatedCountries);
    toast.success(`Country has been updated to "${name}"`);
  };

  const handleDeleteCountry = (id: string) => {
    const updatedCountries = countries.filter(country => country.id !== id);
    setCountries(updatedCountries);
    toast.success("Country has been deleted");
  };

  // State operations
  const handleAddState = (countryId: string, name: string) => {
    const newState: State = {
      id: uuidv4(),
      name,
      cities: []
    };
    
    const updatedCountries = countries.map(country => 
      country.id === countryId 
        ? { ...country, states: [...country.states, newState] } 
        : country
    );
    
    setCountries(updatedCountries);
    
    // Update selected country if it's the one being modified
    if (selectedCountry && selectedCountry.id === countryId) {
      const updatedCountry = updatedCountries.find(c => c.id === countryId);
      if (updatedCountry) {
        setSelectedCountry(updatedCountry);
      }
    }
    
    toast.success(`State "${name}" has been added`);
  };

  const handleEditState = (countryId: string, stateId: string, name: string) => {
    const updatedCountries = countries.map(country => {
      if (country.id === countryId) {
        const updatedStates = country.states.map(state => 
          state.id === stateId ? { ...state, name } : state
        );
        return { ...country, states: updatedStates };
      }
      return country;
    });
    
    setCountries(updatedCountries);
    
    // Update selected country and state if they're being modified
    if (selectedCountry && selectedCountry.id === countryId) {
      const updatedCountry = updatedCountries.find(c => c.id === countryId);
      if (updatedCountry) {
        setSelectedCountry(updatedCountry);
        
        if (selectedState && selectedState.id === stateId) {
          const updatedState = updatedCountry.states.find(s => s.id === stateId);
          if (updatedState) {
            setSelectedState(updatedState);
          }
        }
      }
    }
    
    toast.success(`State has been updated to "${name}"`);
  };

  const handleDeleteState = (countryId: string, stateId: string) => {
    const updatedCountries = countries.map(country => {
      if (country.id === countryId) {
        return {
          ...country,
          states: country.states.filter(state => state.id !== stateId)
        };
      }
      return country;
    });
    
    setCountries(updatedCountries);
    
    // Update selected country if it's the one being modified
    if (selectedCountry && selectedCountry.id === countryId) {
      const updatedCountry = updatedCountries.find(c => c.id === countryId);
      if (updatedCountry) {
        setSelectedCountry(updatedCountry);
      }
    }
    
    // If we deleted the currently selected state, go back to states view
    if (selectedState && selectedState.id === stateId) {
      setSelectedState(null);
      setView('states');
    }
    
    toast.success("State has been deleted");
  };

  // City operations
  const handleAddCity = (countryId: string, stateId: string, name: string) => {
    const newCity = {
      id: uuidv4(),
      name
    };
    
    const updatedCountries = countries.map(country => {
      if (country.id === countryId) {
        const updatedStates = country.states.map(state => {
          if (state.id === stateId) {
            return {
              ...state,
              cities: [...state.cities, newCity]
            };
          }
          return state;
        });
        return { ...country, states: updatedStates };
      }
      return country;
    });
    
    setCountries(updatedCountries);
    
    // Update selected country and state if they're being modified
    if (selectedCountry && selectedCountry.id === countryId) {
      const updatedCountry = updatedCountries.find(c => c.id === countryId);
      if (updatedCountry) {
        setSelectedCountry(updatedCountry);
        
        if (selectedState && selectedState.id === stateId) {
          const updatedState = updatedCountry.states.find(s => s.id === stateId);
          if (updatedState) {
            setSelectedState(updatedState);
          }
        }
      }
    }
    
    toast.success(`City "${name}" has been added`);
  };

  const handleEditCity = (countryId: string, stateId: string, cityId: string, name: string) => {
    const updatedCountries = countries.map(country => {
      if (country.id === countryId) {
        const updatedStates = country.states.map(state => {
          if (state.id === stateId) {
            const updatedCities = state.cities.map(city => 
              city.id === cityId ? { ...city, name } : city
            );
            return { ...state, cities: updatedCities };
          }
          return state;
        });
        return { ...country, states: updatedStates };
      }
      return country;
    });
    
    setCountries(updatedCountries);
    
    // Update selected country and state if they're being modified
    if (selectedCountry && selectedCountry.id === countryId) {
      const updatedCountry = updatedCountries.find(c => c.id === countryId);
      if (updatedCountry) {
        setSelectedCountry(updatedCountry);
        
        if (selectedState && selectedState.id === stateId) {
          const updatedState = updatedCountry.states.find(s => s.id === stateId);
          if (updatedState) {
            setSelectedState(updatedState);
          }
        }
      }
    }
    
    toast.success(`City has been updated to "${name}"`);
  };

  const handleDeleteCity = (countryId: string, stateId: string, cityId: string) => {
    const updatedCountries = countries.map(country => {
      if (country.id === countryId) {
        const updatedStates = country.states.map(state => {
          if (state.id === stateId) {
            return {
              ...state,
              cities: state.cities.filter(city => city.id !== cityId)
            };
          }
          return state;
        });
        return { ...country, states: updatedStates };
      }
      return country;
    });
    
    setCountries(updatedCountries);
    
    // Update selected country if it's the one being modified
    if (selectedCountry && selectedCountry.id === countryId) {
      const updatedCountry = updatedCountries.find(c => c.id === countryId);
      if (updatedCountry) {
        setSelectedCountry(updatedCountry);
      }
    }
    
    toast.success("City has been deleted");
  };

  // Navigation
  const handleSelectCountry = (country: Country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setView('states');
  };

  const handleSelectState = (country: Country, state: State) => {
    setSelectedCountry(country);
    setSelectedState(state);
    setView('cities');
  };

  const handleBackToCountries = () => {
    setSelectedCountry(null);
    setSelectedState(null);
    setView('countries');
  };

  const handleBackToStates = () => {
    setSelectedState(null);
    setView('states');
  };

  return {
    countries,
    selectedCountry,
    selectedState,
    view,
    handleAddCountry,
    handleEditCountry,
    handleDeleteCountry,
    handleAddState,
    handleEditState,
    handleDeleteState,
    handleAddCity,
    handleEditCity,
    handleDeleteCity,
    handleSelectCountry,
    handleSelectState,
    handleBackToCountries,
    handleBackToStates
  };
}
