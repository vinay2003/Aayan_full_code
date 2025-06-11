import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash, Pencil } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const mockTestimonials = [
  {
    id: '1',
    name: 'John Doe',
    role: 'CEO, Example Corp',
    message: 'The service was excellent and the team was very professional. Highly recommended!',
    active: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Marketing Director, XYZ Inc',
    message: 'Working with this company has been a game-changer for our business. The results speak for themselves.',
    active: true,
  },
  {
    id: '3',
    name: 'Robert Johnson',
    role: 'CTO, Tech Solutions',
    message: 'Very impressed with the quality of work. Will definitely be using their services again.',
    active: false,
  },
];

const testimonialSchema = z.object({
  name: z.string().min(2).max(50),
  role: z.string().min(2).max(50),
  message: z.string().min(10).max(500),
  active: z.boolean().default(true),
});

export const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const addForm = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      role: '',
      message: '',
      active: true,
    },
  });

  const editForm = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      role: '',
      message: '',
      active: true,
    },
  });

  useEffect(() => {
    setTestimonials(mockTestimonials);
  }, []);

  const onAddSubmit = (data) => {
    const newTestimonial = {
      id: (testimonials.length + 1).toString(),
      ...data,
    };
    setTestimonials([...testimonials, newTestimonial]);
    toast.success('Testimonial added successfully');
    setIsAddDialogOpen(false);
    addForm.reset();
  };

  const onEditSubmit = (data) => {
    if (!selectedTestimonial) return;

    const updated = testimonials.map(t =>
      t.id === selectedTestimonial.id ? { ...t, ...data } : t
    );
    setTestimonials(updated);
    toast.success('Testimonial updated successfully');
    setIsEditDialogOpen(false);
    setSelectedTestimonial(null);
  };

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    toast.success('Testimonial deleted successfully');
  };

  const handleStatusChange = (id, active) => {
    const updated = testimonials.map(t =>
      t.id === id ? { ...t, active } : t
    );
    setTestimonials(updated);
    toast.success(`Testimonial ${active ? 'activated' : 'deactivated'} successfully`);
  };

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    editForm.reset(testimonial);
    setIsEditDialogOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Testimonials Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus style={{ height: '16px', width: '16px', marginRight: '8px' }} />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(onAddSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormField name="name" control={addForm.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Client name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="role" control={addForm.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role/Company</FormLabel>
                      <FormControl>
                        <Input placeholder="CEO, Example Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField name="message" control={addForm.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Testimonial message" style={{ minHeight: '100px' }} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="active" control={addForm.control} render={({ field }) => (
                  <FormItem>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Active</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {testimonials.map(testimonial => (
          <Card key={testimonial.id} style={{ opacity: testimonial.active ? 1 : 0.6 }}>
            <CardContent style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Avatar>
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p style={{ fontWeight: 500 }}>{testimonial.name}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>{testimonial.role}</p>
                  </div>
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>"{testimonial.message}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#1F2937' }}>{testimonial.active ? 'Active' : 'Inactive'}</span>
                    <Switch checked={testimonial.active} onCheckedChange={(val) => handleStatusChange(testimonial.id, val)} />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                      <Pencil style={{ height: '16px', width: '16px', marginRight: '4px' }} /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial.id)}>
                      <Trash style={{ height: '16px', width: '16px', marginRight: '4px' }} /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {testimonials.length === 0 && (
          <div style={{ padding: '2rem', border: '1px solid #E5E7EB', borderRadius: '0.375rem', textAlign: 'center' }}>
            <p style={{ color: '#9CA3AF' }}>No testimonials found. Add one to get started.</p>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
          </DialogHeader>
          {selectedTestimonial && (
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <FormField name="name" control={editForm.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Client name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField name="role" control={editForm.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role/Company</FormLabel>
                      <FormControl>
                        <Input placeholder="CEO, Example Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField name="message" control={editForm.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Testimonial message" style={{ minHeight: '100px' }} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="active" control={editForm.control} render={({ field }) => (
                  <FormItem>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel>Active</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
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
