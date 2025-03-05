
import React, { useState } from 'react';
import { Country, State } from '@/lib/types';
import ConfirmationDialog from './ConfirmationDialog';
import ActionButton from './ActionButton';
import EmptyState from './EmptyState';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, Plus, Trash } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CityListProps {
  country: Country;
  state: State;
  onBackToStates: () => void;
  onAddCity: (countryId: string, stateId: string, name: string) => void;
  onDeleteCity: (countryId: string, stateId: string, cityId: string) => void;
}

const CityList: React.FC<CityListProps> = ({
  country,
  state,
  onBackToStates,
  onAddCity,
  onDeleteCity
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [selectedCityName, setSelectedCityName] = useState<string>('');

  const handleAddConfirm = () => {
    if (newCityName.trim()) {
      onAddCity(country.id, state.id, newCityName.trim());
      setNewCityName('');
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedCityId) {
      onDeleteCity(country.id, state.id, selectedCityId);
      setIsDeleteDialogOpen(false);
    }
  };

  const openDeleteDialog = (cityId: string, cityName: string) => {
    setSelectedCityId(cityId);
    setSelectedCityName(cityName);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button onClick={onBackToStates} variant="ghost" size="sm" className="group">
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to {country.name} States
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">{state.name}</h2>
            <Badge variant="outline">{country.name}</Badge>
          </div>
          <p className="text-muted-foreground mt-1">Manage cities in this state</p>
        </div>
        <ActionButton
          onClick={() => setIsAddDialogOpen(true)}
          icon={<Plus className="h-4 w-4" />}
          label="Add City"
          variant="default"
        />
      </div>

      {state.cities.length === 0 ? (
        <EmptyState
          title={`No Cities Added to ${state.name} Yet`}
          description="Add your first city to this state"
          icon={<Building className="h-12 w-12 opacity-20" />}
          action={
            <Button onClick={() => setIsAddDialogOpen(true)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add City
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 entity-list">
          {state.cities.map((city) => (
            <Card 
              key={city.id}
              className="entity-card overflow-hidden border border-border/50 shadow-sm hover:shadow transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{city.name}</CardTitle>
                  <Badge variant="outline">City</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-muted-foreground">
                  Located in {state.name}, {country.name}
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-3">
                <ActionButton
                  onClick={() => openDeleteDialog(city.id, city.name)}
                  icon={<Trash className="h-4 w-4" />}
                  variant="outline"
                  size="sm"
                  label="Delete"
                  className="ml-auto"
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add City Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle>Add New City</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              placeholder="Enter city name"
              className="w-full"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddConfirm}>
              Add City
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Delete City"
        description={`Are you sure you want to delete ${selectedCityName}?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
};

export default CityList;
