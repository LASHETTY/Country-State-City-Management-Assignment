
import React from 'react';
import CountryList from '@/components/CountryList';
import StateList from '@/components/StateList';
import CityList from '@/components/CityList';
import { useEntityManagement } from '@/hooks/useEntityManagement';

const Index = () => {
  const {
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
  } = useEntityManagement();

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
            onEditCity={handleEditCity}
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
