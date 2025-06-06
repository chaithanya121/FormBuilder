
import React from 'react';
import { Layers } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`border-t ${theme === 'light' 
      ? 'bg-white/80 border-gray-200/50 shadow-lg' 
      : 'bg-gray-900/80 border-gray-800/50 shadow-2xl'
    } py-16 backdrop-blur-xl`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <span className={`text-xl font-bold bg-gradient-to-r ${theme === 'light'
                ? 'from-gray-900 to-blue-800'
                : 'from-white to-blue-200'
              } bg-clip-text text-transparent`}>
                Form Builder Pro
              </span>
            </div>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-6 leading-relaxed`}>
              Create beautiful forms in minutes with our intuitive drag-and-drop form builder.
            </p>
          </motion.div>
          
          {[
            {
              title: 'Product',
              links: ['Features', 'Templates', 'Integrations', 'Pricing']
            },
            {
              title: 'Resources', 
              links: ['Documentation', 'Guides', 'Blog', 'Support']
            },
            {
              title: 'Company',
              links: ['About', 'Careers', 'Contact', 'Privacy']
            }
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-6`}>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className={`text-sm ${theme === 'light' 
                        ? 'text-gray-600 hover:text-blue-600' 
                        : 'text-gray-400 hover:text-blue-400'
                      } transition-all duration-300 hover:translate-x-1 inline-block`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className={`border-t ${theme === 'light' ? 'border-gray-200/50' : 'border-gray-800/50'} mt-16 pt-8 flex flex-col md:flex-row justify-between items-center`}
        >
          <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
            © 2025 Form Builder Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-6 md:mt-0">
            {['github', 'facebook', 'twitter'].map((social, index) => (
              <a 
                key={social}
                href="#" 
                className={`${theme === 'light' 
                  ? 'text-gray-500 hover:text-blue-600' 
                  : 'text-gray-400 hover:text-blue-400'
                } transition-all duration-300 hover:scale-110`}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {social === 'github' && (
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  )}
                  {social === 'facebook' && (
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  )}
                  {social === 'twitter' && (
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
