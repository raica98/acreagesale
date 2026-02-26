import React, { useState } from 'react';
import { Plus, X, Edit3, Save, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface BoundaryPoint {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

interface BoundaryPointsEditorProps {
  initialPoints: BoundaryPoint[];
  onPointsChange: (points: BoundaryPoint[]) => void;
  editable?: boolean;
}

export function BoundaryPointsEditor({ 
  initialPoints, 
  onPointsChange, 
  editable = true 
}: BoundaryPointsEditorProps) {
  const [points, setPoints] = useState<BoundaryPoint[]>(initialPoints);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // Sync local state with parent when initialPoints change
  React.useEffect(() => {
    console.log('BoundaryPointsEditor: initialPoints changed:', initialPoints);
    setPoints(initialPoints);
  }, [initialPoints]);

  const handleEdit = (point: BoundaryPoint) => {
    setEditingId(point.id);
    setEditValue(`${point.lat.toFixed(6)}, ${point.lng.toFixed(6)}`);
  };

  const handleSave = (pointId: string) => {
    const coords = editValue.split(',').map(coord => parseFloat(coord.trim()));
    
    if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
      alert('Please enter valid coordinates in format: lat, lng');
      return;
    }

    const updatedPoints = points.map(point =>
      point.id === pointId ? { ...point, lat: coords[0], lng: coords[1] } : point
    );
    
    setEditingId(null);
    
    // Call the parent's save function immediately
    console.log('Saving updated points:', updatedPoints);
    onPointsChange(updatedPoints);
    
    // Update local state after successful save
    setPoints(updatedPoints);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const addNewPoint = () => {
    const newPoint: BoundaryPoint = {
      id: `point-${Date.now()}`,
      label: `Point ${points.length + 1}`,
      lat: points.length > 0 ? points[0].lat + 0.0001 : 34.403000,
      lng: points.length > 0 ? points[0].lng + 0.0001 : -117.519000
    };
    
    const updatedPoints = [...points, newPoint];
    
    // Automatically start editing the new point
    setEditingId(newPoint.id);
    setEditValue(`${newPoint.lat.toFixed(6)}, ${newPoint.lng.toFixed(6)}`);
    
    // Save to database immediately
    console.log('Adding new point and saving:', updatedPoints);
    onPointsChange(updatedPoints);
    
    // Update local state after save
    setPoints(updatedPoints);
  };

  const removePoint = (pointId: string) => {
    if (points.length <= 3) {
      alert('A property must have at least 3 boundary points');
      return;
    }
    
    const updatedPoints = points.filter(point => point.id !== pointId);
    setPoints(updatedPoints);
    console.log('Removing point and saving:', updatedPoints);
    onPointsChange(updatedPoints);
  };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        {points.map((point) => (
          <div key={point.id} className="bg-white rounded-lg p-2 border border-blue-200 group hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-medium text-sm flex items-center gap-1 min-w-0 flex-shrink-0">
                <MapPin className="w-3 h-3" />
                {point.label}
              </span>
              {editable && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  {editingId === point.id ? (
                    <>
                      <button
                        onClick={() => handleSave(point.id)}
                        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Save changes"
                      >
                        <Save className="w-3 h-3" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-1 text-gray-400 hover:bg-gray-50 rounded transition-colors"
                        title="Cancel editing"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(point)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit coordinates"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      {points.length > 3 && (
                        <button
                          onClick={() => removePoint(point.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="Remove point"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            
            {editingId === point.id ? (
              <div className="mt-2">
                <Input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="lat, lng (e.g., 34.404000, -117.520000)"
                  className="h-7 text-xs font-mono w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSave(point.id);
                    } else if (e.key === 'Escape') {
                      handleCancel();
                    }
                  }}
                  autoFocus
                />
              </div>
            ) : (
              <div className="text-gray-700 font-mono text-xs mt-1 cursor-pointer" onClick={() => editable && handleEdit(point)}>
                {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {editable && (
        <div className="mt-2 flex items-center justify-center">
          <Button
            onClick={addNewPoint}
            className="flex items-center gap-1 bg-[#329cf9] hover:bg-[#329cf9]/90 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors shadow-sm hover:shadow-md"
          >
            <Plus className="w-3 h-3" />
            Add More Points
          </Button>
        </div>
      )}
      
      <div className="text-xs text-gray-500 text-center mt-1">
        {points.length} boundary points defined
      </div>
    </div>
  );
}