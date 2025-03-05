
import React, { useState } from 'react';
import { Country } from '@/lib/types';
import ConfirmationDialog from './ConfirmationDialog';
import ActionButton from './ActionButton';
import EmptyState from './EmptyState';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronRight, Edit, Globe, Plus, Trash } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CountryListProps {
  countries: Country[];
  onAddCountry: (name: string) => void;
  onEditCountry: (id: string, name: string) => void;
  onDeleteCountry: (id: string) => void;
  onSelectCountry: (country: Country) => void;
}

const CountryList: React.FC<CountryListProps> = ({
  countries,
  onAddCountry,
  onEditCountry,
  onDeleteCountry,
  onSelectCountry
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newCountryName, setNewCountryName] = useState('');
  const [editCountryName, setEditCountryName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleAddConfirm = () => {
    if (newCountryName.trim()) {
      onAddCountry(newCountryName.trim());
      setNewCountryName('');
      setIsAddDialogOpen(false);
    }
  };

  const handleEditConfirm = () => {
    if (selectedCountry && editCountryName.trim()) {
      onEditCountry(selectedCountry.id, editCountryName.trim());
      setEditCountryName('');
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedCountry) {
      onDeleteCountry(selectedCountry.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (country: Country) => {
    setSelectedCountry(country);
    setEditCountryName(country.name);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (country: Country) => {
    setSelectedCountry(country);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Countries</h2>
        <ActionButton
          onClick={() => setIsAddDialogOpen(true)}
          icon={<Plus className="h-4 w-4" />}
          label="Add Country"
          variant="default"
        />
      </div>

      {countries.length === 0 ? (
        <EmptyState
          title="No Countries Added Yet"
          description="Add your first country to get started"
          icon={<Globe className="h-12 w-12 opacity-20" />}
          action={
            <Button onClick={() => setIsAddDialogOpen(true)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Country
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 entity-list">
          {countries.map((country) => (
            <Card 
              key={country.id} 
              className="entity-card overflow-hidden border border-border/50 shadow-sm hover:shadow transition-all duration-200"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{country.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {country.states.length} {country.states.length === 1 ? 'State' : 'States'}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    Country
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                {country.states.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {country.states.slice(0, 3).map((state) => (
                      <Badge key={state.id} variant="secondary" className="text-xs">
                        {state.name}
                      </Badge>
                    ))}
                    {country.states.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{country.states.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2 pb-3">
                <div className="flex gap-2">
                  <ActionButton
                    onClick={() => openEditDialog(country)}
                    icon={<Edit className="h-4 w-4" />}
                    variant="outline"
                    size="sm"
                    tooltip="Edit Country"
                  />
                  <ActionButton
                    onClick={() => openDeleteDialog(country)}
                    icon={<Trash className="h-4 w-4" />}
                    variant="outline"
                    size="sm"
                    tooltip="Delete Country"
                  />
                </div>
                <ActionButton
                  onClick={() => onSelectCountry(country)}
                  icon={<ChevronRight className="h-4 w-4" />}
                  variant="ghost"
                  size="sm"
                  label="Manage States"
                  className="ml-auto"
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Add Country Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle>Add New Country</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={newCountryName}
              onChange={(e) => setNewCountryName(e.target.value)}
              placeholder="Enter country name"
              className="w-full"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddConfirm}>
              Add Country
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Country Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle>Edit Country</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={editCountryName}
              onChange={(e) => setEditCountryName(e.target.value)}
              placeholder="Enter new country name"
              className="w-full"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleEditConfirm}>
              Update Country
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Delete Country"
        description={`Are you sure you want to delete ${selectedCountry?.name}? This will also delete all its states and cities.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        isDestructive={true}
      />
    </div>
  );
};

export default CountryList;
