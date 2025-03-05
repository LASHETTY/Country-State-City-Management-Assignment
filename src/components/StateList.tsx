
import React, { useState } from 'react';
import { Country, State } from '@/lib/types';
import ConfirmationDialog from './ConfirmationDialog';
import ActionButton from './ActionButton';
import EmptyState from './EmptyState';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, Edit, MapPin, Plus, Trash } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StateListProps {
  country: Country;
  onBackToCountries: () => void;
  onAddState: (countryId: string, name: string) => void;
  onEditState: (countryId: string, stateId: string, name: string) => void;
  onDeleteState: (countryId: string, stateId: string) => void;
  onSelectState: (country: Country, state: State) => void;
}

const StateList: React.FC<StateListProps> = ({
  country,
  onBackToCountries,
  onAddState,
  onEditState,
  onDeleteState,
  onSelectState
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newStateName, setNewStateName] = useState('');
  const [editStateName, setEditStateName] = useState('');
  const [selectedState, setSelectedState] = useState<State | null>(null);

  const handleAddConfirm = () => {
    if (newStateName.trim()) {
      onAddState(country.id, newStateName.trim());
      setNewStateName('');
      setIsAddDialogOpen(false);
    }
  };

  const handleEditConfirm = () => {
    if (selectedState && editStateName.trim()) {
      onEditState(country.id, selectedState.id, editStateName.trim());
      setEditStateName('');
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedState) {
      onDeleteState(country.id, selectedState.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (state: State) => {
    setSelectedState(state);
    setEditStateName(state.name);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (state: State) => {
    setSelectedState(state);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button onClick={onBackToCountries} variant="ghost" size="sm" className="group">
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to Countries
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{country.name}</h2>
          <p className="text-muted-foreground mt-1">Manage states in this country</p>
        </div>
        <ActionButton
          onClick={() => setIsAddDialogOpen(true)}
          icon={<Plus className="h-4 w-4" />}
          label="Add State"
          variant="default"
        />
      </div>

      {country.states.length === 0 ? (
        <EmptyState
          title={`No States Added to ${country.name} Yet`}
          description="Add your first state to this country"
          icon={<MapPin className="h-12 w-12 opacity-20" />}
          action={
            <Button onClick={() => setIsAddDialogOpen(true)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add State
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 entity-list">
          {country.states.map((state) => (
            <Card 
              key={state.id}
              className="entity-card overflow-hidden border border-border/50 shadow-sm hover:shadow transition-all duration-200"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{state.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {state.cities.length} {state.cities.length === 1 ? 'City' : 'Cities'}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    State
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                {state.cities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {state.cities.slice(0, 3).map((city) => (
                      <Badge key={city.id} variant="secondary" className="text-xs">
                        {city.name}
                      </Badge>
                    ))}
                    {state.cities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{state.cities.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2 pb-3">
                <div className="flex gap-2">
                  <ActionButton
                    onClick={() => openEditDialog(state)}
                    icon={<Edit className="h-4 w-4" />}
                    variant="outline"
                    size="sm"
                    tooltip="Edit State"
                  />
                  <ActionButton
                    onClick={() => openDeleteDialog(state)}
                    icon={<Trash className="h-4 w-4" />}
                    variant="outline"
                    size="sm"
                    tooltip="Delete State"
                  />
                </div>
                <ActionButton
                  onClick={() => onSelectState(country, state)}
                  icon={<ChevronRight className="h-4 w-4" />}
                  variant="ghost"
                  size="sm"
                  label="Manage Cities"
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add State Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle>Add New State</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newStateName}
              onChange={(e) => setNewStateName(e.target.value)}
              placeholder="Enter state name"
              className="w-full"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddConfirm}>
              Add State
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit State Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle>Edit State</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={editStateName}
              onChange={(e) => setEditStateName(e.target.value)}
              placeholder="Enter new state name"
              className="w-full"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleEditConfirm}>
              Update State
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Delete State"
        description={`Are you sure you want to delete ${selectedState?.name}? This will also delete all its cities.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
};

export default StateList;
