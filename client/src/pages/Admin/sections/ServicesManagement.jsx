'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash, Pencil } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Mock services
const mockServices = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Custom web applications built with the latest technologies.',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    active: true,
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    active: true,
  },
  {
    id: '3',
    title: 'UI/UX Design',
    description: 'User-centered design that enhances user experience and engagement.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    active: false,
  },
];

const serviceSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(10).max(500),
  imageUrl: z.any().refine((file) => {
    if (typeof file === 'string') return true;
    return file instanceof FileList && file.length > 0;
  }, 'Please select an image'),
  active: z.boolean().default(true),
});

export const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const addForm = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      description: '',
      active: true,
    },
  });

  const editForm = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      description: '',
      active: true,
    },
  });

  useEffect(() => {
    setServices(mockServices);
  }, []);

  const handleImageChange = (event, form) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result);
          form.setValue('imageUrl', event.target.files);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const onAddSubmit = (data) => {
    const newService = {
      id: (services.length + 1).toString(),
      title: data.title,
      description: data.description,
      imageUrl: imagePreview || 'https://via.placeholder.com/150',
      active: data.active,
    };
    setServices([...services, newService]);
    toast.success('Service added successfully');
    setIsAddDialogOpen(false);
    addForm.reset();
    setImagePreview(null);
  };

  const onEditSubmit = (data) => {
    if (!selectedService) return;
    const updated = services.map((s) =>
      s.id === selectedService.id
        ? {
            ...s,
            title: data.title,
            description: data.description,
            imageUrl: imagePreview || s.imageUrl,
            active: data.active,
          }
        : s
    );
    setServices(updated);
    toast.success('Service updated successfully');
    setIsEditDialogOpen(false);
    setSelectedService(null);
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
    toast.success('Service deleted');
  };

  const handleStatusChange = (id, active) => {
    const updated = services.map((s) => (s.id === id ? { ...s, active } : s));
    setServices(updated);
    toast.success(`Service ${active ? 'activated' : 'deactivated'}`);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setImagePreview(service.imageUrl);
    editForm.reset({
      title: service.title,
      description: service.description,
      active: service.active,
      imageUrl: service.imageUrl,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Services Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={addForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Service title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Service description" className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, addForm)} />
                  </FormControl>
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="max-h-40 rounded-md" />
                    </div>
                  )}
                </FormItem>
                <FormField
                  control={addForm.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Active</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <Card key={service.id} className={`${!service.active ? 'opacity-60' : ''}`}>
            <CardContent className="p-6">
              <div className="md:flex gap-4">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <img src={service.imageUrl} alt={service.title} className="w-full h-40 object-cover rounded-md" />
                </div>
                <div className="md:w-3/4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <div className="flex items-center">
                        <Label htmlFor={`service-active-${service.id}`} className="mr-2 text-sm">
                          {service.active ? 'Active' : 'Inactive'}
                        </Label>
                        <Switch
                          id={`service-active-${service.id}`}
                          checked={service.active}
                          onCheckedChange={(checked) => handleStatusChange(service.id, checked)}
                        />
                      </div>
                    </div>
                    <p className="text-gray-500 mb-4">{service.description}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline" className="flex items-center" onClick={() => handleEdit(service)}>
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" className="flex items-center" onClick={() => handleDelete(service.id)}>
                      <Trash className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {services.length === 0 && (
          <div className="flex items-center justify-center p-8 border rounded-md">
            <p className="text-gray-500">No services found. Add one to get started.</p>
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <FormField
                  control={editForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Service title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Service description" className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, editForm)} />
                  </FormControl>
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="max-h-40 rounded-md" />
                    </div>
                  )}
                </FormItem>
                <FormField
                  control={editForm.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Active</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Update</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
