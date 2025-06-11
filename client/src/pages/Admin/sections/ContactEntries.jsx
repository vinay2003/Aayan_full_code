import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Trash, Eye, Mail, Phone, User, Calendar } from 'lucide-react';

// Mock contact entries
const mockContactEntries = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    message: 'I would like to inquire about your web development services. Please contact me at your earliest convenience.',
    createdAt: '2023-05-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    message: 'We are looking for a partner for our upcoming project. Can someone from your team contact me to discuss details?',
    createdAt: '2023-05-14T15:45:00Z',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '555-123-4567',
    message: 'I need a quote for a mobile app development project. The app is for a food delivery service.',
    createdAt: '2023-05-13T09:15:00Z',
  },
];

export const ContactEntries = () => {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    setEntries(mockContactEntries);
  }, []);

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Contact entry deleted successfully');
  };

  const handleView = (entry) => {
    setSelectedEntry(entry);
    setIsViewDialogOpen(true);
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Contact Form Submissions</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {entries.map(entry => (
          <Card key={entry.id}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <p className="font-medium text-gray-800">{entry.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-gray-700 break-all">{entry.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-gray-700">{entry.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-gray-600">{formatDate(entry.createdAt)}</p>
                  </div>
                </div>
                <div className="flex flex-row lg:flex-col xl:flex-row gap-2 lg:items-end">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="flex items-center flex-1 lg:flex-none xl:flex-1 text-gray-700"
                    onClick={() => handleView(entry)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button 
                    size="sm"
                    variant="destructive"
                    className="flex items-center flex-1 lg:flex-none xl:flex-1"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {entries.length === 0 && (
          <div className="flex items-center justify-center p-8 border rounded-md bg-gray-50">
            <p className="text-gray-600 text-center">No contact form submissions found.</p>
          </div>
        )}
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Contact Submission Details</DialogTitle>
          </DialogHeader>

          {selectedEntry && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Name</h4>
                  <p className="text-gray-800 break-words">{selectedEntry.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Email</h4>
                  <p className="text-gray-800 break-all">{selectedEntry.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Phone</h4>
                  <p className="text-gray-800">{selectedEntry.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-600">Date</h4>
                  <p className="text-sm text-gray-700">{formatDate(selectedEntry.createdAt)}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-600">Message</h4>
                <Card className="mt-2 bg-gray-50">
                  <CardContent className="p-4">
                    <p className="whitespace-pre-wrap break-words text-gray-800">{selectedEntry.message}</p>
                  </CardContent>
                </Card>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                  className="w-full sm:w-auto text-gray-700"
                >
                  Close
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(selectedEntry.id);
                    setIsViewDialogOpen(false);
                  }}
                  className="w-full sm:w-auto"
                >
                  Delete Entry
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
