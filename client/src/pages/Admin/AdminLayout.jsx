import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { SliderManagement } from './sections/SliderManagement';
import { AboutSection } from './sections/AboutSection';
import { ServicesManagement } from './sections/ServicesManagement';
import { TestimonialsManagement } from './sections/TestimonialsManagement';
import { ContactEntries } from './sections/ContactEntries';
import logo from '@/assets/logo.png';
import {
  LogOut,
  Image,
  Info,
  Briefcase,
  MessageSquare,
  Mail,
  Menu,
} from 'lucide-react';

export const AdminLayout = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('slider');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminRefreshToken');
    toast.success('Logged out successfully');
    onLogout();
  };

  const tabs = [
    { id: 'slider', label: 'Slider', icon: Image },
    { id: 'about', label: 'About', icon: Info },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f7fa' }}>
      <header
        className="border-b p-4 flex items-center justify-between"
        style={{ backgroundColor: '#ffffff', borderBottomColor: '#d1d5db' }}
      >
        <div className="flex items-center">
          <img src={logo} alt="logo" className="h-10 w-10"/>
          <h1 className="font-bold text-xl text-[#111827]">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px] bg-white">
              <div className="flex flex-col space-y-4 mt-4">
                <h2 className="font-semibold text-lg text-[#1f2937]">Navigation</h2>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? 'default' : 'ghost'}
                      className="justify-start"
                      onClick={() => handleTabChange(tab.id)}
                      style={{
                        backgroundColor: activeTab === tab.id ? '#e5e7eb' : 'transparent',
                        color: '#111827',
                      }}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </Button>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="flex items-center"
            style={{ color: '#ef4444' }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <div className="flex-1 container mx-auto py-6 px-4 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b mb-6 hidden md:block">
            <TabsList className="bg-transparent">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center"
                    style={{ color: activeTab === tab.id ? '#2563eb' : '#374151' }}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <div className="w-full">
            <TabsContent value="slider"><SliderManagement /></TabsContent>
            <TabsContent value="about"><AboutSection /></TabsContent>
            <TabsContent value="services"><ServicesManagement /></TabsContent>
            <TabsContent value="testimonials"><TestimonialsManagement /></TabsContent>
            <TabsContent value="contact"><ContactEntries /></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminLayout;