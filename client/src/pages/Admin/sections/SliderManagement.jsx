"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Trash, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const mockSliders = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    altText: 'Woman working on laptop',
    active: true,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    altText: 'Laptop computer',
    active: true,
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    altText: 'Circuit board',
    active: false,
  },
];

const sliderSchema = z.object({
  imageUrl: z.any().refine((file) => {
    if (typeof file === 'string') return true;
    return file instanceof FileList && file.length > 0;
  }, 'Please select an image'),
  altText: z.string().min(3, { message: 'Alt text is required (min 3 characters)' }),
  active: z.boolean().default(true),
});

export const SliderManagement = () => {
  const [sliders, setSliders] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const addForm = useForm({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      altText: '',
      active: true,
    },
  });

  const editForm = useForm({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      altText: '',
      active: true,
    },
  });

  useEffect(() => {
    setSliders(mockSliders);
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
    const newSlider = {
      id: (sliders.length + 1).toString(),
      imageUrl: imagePreview || '',
      altText: data.altText,
      active: data.active,
    };
    setSliders([...sliders, newSlider]);
    toast.success('Slider added successfully');
    setIsAddDialogOpen(false);
    addForm.reset();
    setImagePreview(null);
  };

  const onEditSubmit = (data) => {
    if (!selectedSlider) return;
    const updatedSliders = sliders.map((slider) => {
      if (slider.id === selectedSlider.id) {
        return {
          ...slider,
          imageUrl: imagePreview || slider.imageUrl,
          altText: data.altText,
          active: data.active,
        };
      }
      return slider;
    });
    setSliders(updatedSliders);
    toast.success('Slider updated successfully');
    setIsEditDialogOpen(false);
    setSelectedSlider(null);
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    setSliders(sliders.filter((slider) => slider.id !== id));
    toast.success('Slider deleted successfully');
  };

  const handleStatusChange = (id, active) => {
    const updatedSliders = sliders.map((slider) => {
      if (slider.id === id) {
        return { ...slider, active };
      }
      return slider;
    });
    setSliders(updatedSliders);
    toast.success(`Slider ${active ? 'activated' : 'deactivated'} successfully`);
  };

  const handleEdit = (slider) => {
    setSelectedSlider(slider);
    setImagePreview(slider.imageUrl);
    editForm.reset({
      altText: slider.altText,
      active: slider.active,
      imageUrl: slider.imageUrl,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#111827]">Slider Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Slider
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-[#111827]">Add New Slider</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormItem>
                  <FormLabel className="text-[#374151]">Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, addForm)} />
                  </FormControl>
                  <FormMessage />
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="max-h-40 rounded-md" />
                    </div>
                  )}
                </FormItem>
                <FormField
                  control={addForm.control}
                  name="altText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#374151]">Alt Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter alt text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="text-[#374151]">Active</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#10b981] hover:bg-[#059669] text-white">
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sliders.map((slider) => (
          <Card key={slider.id} className="overflow-hidden border border-[#e5e7eb]">
            <div className="relative h-40">
              <img src={slider.imageUrl} alt={slider.altText} className="w-full h-full object-cover" />
              {!slider.active && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-medium">Inactive</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-[#111827] truncate">{slider.altText}</p>
                  <div className="flex items-center mt-2">
                    <Label htmlFor={`slider-active-${slider.id}`} className="mr-2 text-sm text-[#374151]">
                      {slider.active ? 'Active' : 'Inactive'}
                    </Label>
                    <Switch
                      id={`slider-active-${slider.id}`}
                      checked={slider.active}
                      onCheckedChange={(checked) => handleStatusChange(slider.id, checked)}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => handleEdit(slider)}>
                    <Pencil className="h-4 w-4 text-[#374151]" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8 bg-[#ef4444] hover:bg-[#dc2626] text-white"
                    onClick={() => handleDelete(slider.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {sliders.length === 0 && (
          <div className="col-span-full flex items-center justify-center p-8 border rounded-md bg-[#f9fafb]">
            <p className="text-[#6b7280]">No sliders found. Add one to get started.</p>
          </div>
        )}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-[#111827]">Edit Slider</DialogTitle>
          </DialogHeader>
          {selectedSlider && (
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <FormItem>
                  <FormLabel className="text-[#374151]">Image</FormLabel>
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
                  name="altText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#374151]">Alt Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter alt text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="text-[#374151]">Active</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#10b981] hover:bg-[#059669] text-white">
                    Update
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SliderManagement;