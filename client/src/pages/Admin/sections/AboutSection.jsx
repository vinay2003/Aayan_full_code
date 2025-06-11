import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Mock about content
const mockAboutContent = `
<h2 class="text-xl font-semibold text-gray-800">About Our Company</h2>
<p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
<p class="text-gray-700">Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.</p>
<h3 class="text-lg font-semibold text-gray-800 mt-4">Our Mission</h3>
<p class="text-gray-700">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum.</p>
`;

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

export const AboutSection = () => {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [savedContent, setSavedContent] = useState('');

  useEffect(() => {
    setContent(mockAboutContent);
    setSavedContent(mockAboutContent);
  }, []);

  const handleSave = () => {
    setSavedContent(content);
    setIsEditing(false);
    toast.success('About content updated successfully');
  };

  const handleCancel = () => {
    setContent(savedContent);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">About Section Management</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700">
            Edit Content
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={handleCancel} className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100">
              Cancel
            </Button>
            <Button onClick={handleSave} className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Card className="bg-white shadow-sm border border-gray-200">
        <CardContent className="p-4 md:p-6">
          {isEditing ? (
            <div className="min-h-[400px]">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                className="h-[300px] md:h-[350px] mb-12 text-gray-800"
              />
            </div>
          ) : (
            <div
              className="prose max-w-none prose-sm md:prose-base prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-blue-600"
              dangerouslySetInnerHTML={{ __html: savedContent }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
