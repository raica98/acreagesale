import React, { useEffect, useState } from 'react';
import {
  Search,
  Download,
  CheckSquare,
  Square,
  FileDown,
  Building2,
  AlertCircle
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { supabase, Database } from '../../lib/supabase';
import { useAdmin } from '../../hooks/useAdmin';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

type Property = Database['public']['Tables']['properties']['Row'] & {
  profiles?: {
    full_name: string | null;
    email: string;
  };
  owner_email?: string;
  owner_name?: string;
};

export function AdminExport() {
  const { logActivity } = useAdmin();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchProperties();
    logActivity('view', 'admin_export');
  }, [statusFilter]);

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.rpc('get_all_properties_admin', {
        status_filter: statusFilter === 'all' ? null : statusFilter,
        limit_count: 1000,
        offset_count: 0
      });

      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }

      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.apn && property.apn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (property.county && property.county.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  const handleSelectAll = () => {
    if (selectedIds.size === filteredProperties.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProperties.map(p => p.id)));
    }
  };

  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const sanitizeSheetName = (name: string): string => {
    let sanitized = name
      .replace(/[:\\/?*\[\]]/g, '-')
      .substring(0, 31);

    if (sanitized.length === 0) {
      sanitized = 'Sheet';
    }

    return sanitized;
  };

  const truncateText = (text: string | null | undefined, maxLength: number = 32000): string => {
    if (!text) return '';
    const str = String(text);
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '... [truncated]';
  };

  const handleExport = async () => {
    if (selectedIds.size === 0) {
      alert('Please select at least one property to export');
      return;
    }

    try {
      setExporting(true);

      const selectedProperties = properties.filter(p => selectedIds.has(p.id));

      const workbook = XLSX.utils.book_new();

      for (const property of selectedProperties) {
        const sheetName = sanitizeSheetName(
          `${property.apn || property.id.substring(0, 8)}, ${property.county || 'Unknown'}`
        );

        const worksheetData = [
          ['Property Information'],
          [''],
          ['Field', 'Value'],
          ['Title', truncateText(property.title, 5000)],
          ['Description', truncateText(property.description, 10000)],
          ['Price', `$${property.price.toLocaleString()}`],
          ['Size (Acres)', property.size_acres],
          [''],
          ['Location Details'],
          [''],
          ['Address', truncateText(property.address, 5000)],
          ['City', truncateText(property.city, 1000)],
          ['State', truncateText(property.state, 1000)],
          ['ZIP Code', truncateText(property.zip_code, 1000)],
          ['County', truncateText(property.county, 1000)],
          ['APN', truncateText(property.apn, 1000)],
          [''],
          ['Coordinates'],
          [''],
          ['Latitude', property.latitude],
          ['Longitude', property.longitude],
          [''],
          ['Property Features'],
          [''],
          ['Zoning', truncateText(property.zoning || 'Not specified', 5000)],
          ['Water', truncateText(property.water || 'Not specified', 5000)],
          ['Electricity', truncateText(property.electricity || 'Not specified', 5000)],
          ['Sewer', truncateText(property.sewer || 'Not specified', 5000)],
          ['Region', truncateText(property.region, 1000)],
          [''],
          ['Status Information'],
          [''],
          ['Status', property.status],
          ['Created At', new Date(property.created_at).toLocaleString()],
          ['Updated At', new Date(property.updated_at).toLocaleString()],
          [''],
          ['Owner Information'],
          [''],
          ['Owner Name', truncateText(property.owner_name || 'Not provided', 1000)],
          ['Owner Email', truncateText(property.owner_email, 1000)],
          [''],
          ['Images'],
          [''],
        ];

        if (property.images && property.images.length > 0) {
          property.images.forEach((img, idx) => {
            worksheetData.push([`Image ${idx + 1}`, truncateText(img, 2000)]);
          });
        } else {
          worksheetData.push(['No images available', '']);
        }

        if (property.boundary_points) {
          worksheetData.push(['']);
          worksheetData.push(['Boundary Points']);
          worksheetData.push(['']);
          const boundaryStr = JSON.stringify(property.boundary_points);
          worksheetData.push([truncateText(boundaryStr, 30000)]);
        }

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        worksheet['!cols'] = [
          { wch: 20 },
          { wch: 50 }
        ];

        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const timestamp = new Date().toISOString().split('T')[0];
      saveAs(blob, `Properties-Export-${timestamp}.xlsx`);

      await logActivity('export', 'properties', undefined, {
        action: 'exported_properties',
        count: selectedIds.size,
        property_ids: Array.from(selectedIds)
      });

      alert(`Successfully exported ${selectedIds.size} ${selectedIds.size === 1 ? 'property' : 'properties'}!`);

      setSelectedIds(new Set());
    } catch (error: any) {
      console.error('Error exporting properties:', error);
      const errorMessage = error?.message || 'Failed to export properties. Please try again.';
      alert(`Export Error: ${errorMessage}`);
    } finally {
      setExporting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      sold: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const allFilteredSelected = filteredProperties.length > 0 && selectedIds.size === filteredProperties.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Export Properties</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Select properties and export to Excel with individual sheets
            </p>
          </div>
          <Button
            onClick={handleExport}
            disabled={selectedIds.size === 0 || exporting}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            {exporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Exporting...
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4 mr-2" />
                Export {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}
              </>
            )}
          </Button>
        </div>

        {selectedIds.size > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {selectedIds.size} {selectedIds.size === 1 ? 'property' : 'properties'} selected
                </span>
              </div>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by title, location, APN, or county..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="rejected">Rejected</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <div className="text-gray-600">Loading properties...</div>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <div className="text-xl font-semibold text-gray-900 dark:text-white">No properties found</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2">
                  {searchTerm ? 'Try adjusting your search' : 'No properties match the selected filters'}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <button
                          onClick={handleSelectAll}
                          className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          title={allFilteredSelected ? "Deselect all" : "Select all"}
                        >
                          {allFilteredSelected ? (
                            <CheckSquare className="h-5 w-5" />
                          ) : (
                            <Square className="h-5 w-5" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        APN
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        County
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredProperties.map((property) => (
                      <tr
                        key={property.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                          selectedIds.has(property.id) ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                        }`}
                        onClick={() => handleToggleSelect(property.id)}
                      >
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleSelect(property.id);
                            }}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                          >
                            {selectedIds.has(property.id) ? (
                              <CheckSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            ) : (
                              <Square className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {property.images && property.images.length > 0 ? (
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {property.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {property.size_acres} acres
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {property.city}, {property.state}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {property.zip_code}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {property.apn || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {property.county || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            ${property.price.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(property.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Export Information
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>Each selected property will be exported to its own sheet in the Excel file</li>
                <li>Sheet names follow the format: "APN, County Name"</li>
                <li>All property details including images, coordinates, and features will be included</li>
                <li>The file will be downloaded as "Properties-Export-YYYY-MM-DD.xlsx"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
