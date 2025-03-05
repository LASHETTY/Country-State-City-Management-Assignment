
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Country, State } from '@/lib/types';
import CountryList from '@/components/CountryList';
import StateList from '@/components/StateList';
import CityList from '@/components/CityList';
import { toast } from '@/components/ui/sonner';

const Index = () => {
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

  // Render appropriate view
  const renderContent = () => {
    switch (view) {
      case 'states':
        if (!selectedCountry) return null;
        return (
          <StateList
            country={selectedCountry}
            onBackToCountries={handleBackToCountries}
            onAddState={handleAddState}
            onEditState={handleEditState}
            onDeleteState={handleDeleteState}
            onSelectState={handleSelectState}
          />
        );
      case 'cities':
        if (!selectedCountry || !selectedState) return null;
        return (
          <CityList
            country={selectedCountry}
            state={selectedState}
            onBackToStates={handleBackToStates}
            onAddCity={handleAddCity}
            onDeleteCity={handleDeleteCity}
          />
        );
      case 'countries':
      default:
        return (
          <CountryList
            countries={countries}
            onAddCountry={handleAddCountry}
            onEditCountry={handleEditCountry}
            onDeleteCountry={handleDeleteCountry}
            onSelectCountry={handleSelectCountry}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/40 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-3xl font-semibold tracking-tight">Geographic Entity Manager</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8 px-6">
        {renderContent()}
      </main>

      <footer className="border-t border-border/40 py-6 bg-secondary/30">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          Country, State, and City Management System
        </div>
      </footer>
    </div>
  );
};

export default Index;
