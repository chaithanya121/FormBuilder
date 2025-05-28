
import React, { useState } from 'react';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@platform.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Available 24/7",
      description: "Get instant help"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Business Ave",
      description: "San Francisco, CA 94105"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50' 
      : 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900'
    } py-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className={`text-5xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Get in Touch
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Have questions about our platform? We're here to help. Reach out to us through any of the channels below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className={`text-2xl font-bold mb-8 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Contact Information
            </h2>
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className={`${theme === 'light' 
                  ? 'bg-white/90 border-gray-200 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-800/50 border-gray-700 shadow-xl hover:shadow-purple-500/10'
                } backdrop-blur-sm transition-all duration-300 p-6`}>
                  <div className="flex items-start">
                    <info.icon className="h-6 w-6 text-purple-600 mt-1 mr-4" />
                    <div>
                      <h3 className={`font-semibold mb-1 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {info.title}
                      </h3>
                      <p className={`text-lg mb-1 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`}>
                        {info.content}
                      </p>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {info.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-gray-200 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm p-8`}>
              <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`${theme === 'light' 
                        ? 'bg-white border-gray-300 focus:border-purple-500' 
                        : 'bg-gray-700 border-gray-600 text-white focus:border-purple-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`${theme === 'light' 
                        ? 'bg-white border-gray-300 focus:border-purple-500' 
                        : 'bg-gray-700 border-gray-600 text-white focus:border-purple-400'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`${theme === 'light' 
                      ? 'bg-white border-gray-300 focus:border-purple-500' 
                      : 'bg-gray-700 border-gray-600 text-white focus:border-purple-400'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`${theme === 'light' 
                      ? 'bg-white border-gray-300 focus:border-purple-500' 
                      : 'bg-gray-700 border-gray-600 text-white focus:border-purple-400'
                    }`}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
