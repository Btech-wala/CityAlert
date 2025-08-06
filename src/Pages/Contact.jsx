import React, { useState } from 'react';
import { User, Mail, MessageCircle, CheckCircle, Send, Sparkles, Phone, MapPin, Clock } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const isNameValid = getFieldValidation('name', formData.name);
  const isEmailValid = getFieldValidation('email', formData.email);
  const isMessageValid = getFieldValidation('message', formData.message);

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    alert("Please fill out all fields correctly.");
    return; // Don't proceed if any field is invalid
  }

  setIsLoading(true);
  await new Promise(resolve => setTimeout(resolve, 1500));
  setIsLoading(false);
  setSubmitted(true);
  setTimeout(() => {
    setSubmitted(false);
    setFormData({ name: '', email: '', message: '' });
  }, 3000);
};


  const isFilled = (value) => value.trim() !== '';

  const getFieldValidation = (field, value) => {
    switch (field) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'name':
        return value.trim().length >= 2;
      case 'message':
        return value.trim().length >= 10;
      default:
        return true;
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <User className={`w-5 h-5 transition-colors duration-300 ${
            focusedField === 'name' || isFilled(formData.name) 
              ? 'text-emerald-500' 
              : 'text-gray-400'
          }`} />
        </div>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          required
          className="peer w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-2 border-gray-200 dark:border-slate-600 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 text-lg"
          placeholder="Your Name"
        />
        <label
          htmlFor="name"
          className={`absolute left-12 px-2 bg-white dark:bg-slate-800 transition-all duration-300 pointer-events-none font-medium ${
            focusedField === 'name' || isFilled(formData.name)
              ? '-top-3 text-sm text-emerald-600 dark:text-emerald-400'
              : 'top-4 text-gray-500 dark:text-gray-400'
          } peer-focus:-top-3 peer-focus:text-sm peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400`}
        >
          Your Name
        </label>
        {isFilled(formData.name) && getFieldValidation('name', formData.name) && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
        )}
      </div>

      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Mail className={`w-5 h-5 transition-colors duration-300 ${
            focusedField === 'email' || isFilled(formData.email) 
              ? 'text-emerald-500' 
              : 'text-gray-400'
          }`} />
        </div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          required
          className="peer w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-2 border-gray-200 dark:border-slate-600 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 text-lg"
          placeholder="Your Email"
        />
        <label
          htmlFor="email"
          className={`absolute left-12 px-2 bg-white dark:bg-slate-800 transition-all duration-300 pointer-events-none font-medium ${
            focusedField === 'email' || isFilled(formData.email)
              ? '-top-3 text-sm text-emerald-600 dark:text-emerald-400'
              : 'top-4 text-gray-500 dark:text-gray-400'
          } peer-focus:-top-3 peer-focus:text-sm peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400`}
        >
          Your Email
        </label>
        {isFilled(formData.email) && getFieldValidation('email', formData.email) && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
        )}
      </div>

      <div className="relative group">
        <div className="absolute left-4 top-5 z-10">
          <MessageCircle className={`w-5 h-5 transition-colors duration-300 ${
            focusedField === 'message' || isFilled(formData.message) 
              ? 'text-emerald-500' 
              : 'text-gray-400'
          }`} />
        </div>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          required
          className="peer w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-slate-700/50 border-2 border-gray-200 dark:border-slate-600 rounded-2xl text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-700 transition-all duration-300 text-lg resize-none"
          placeholder="Your Message"
        />
        <label
          htmlFor="message"
          className={`absolute left-12 px-2 bg-white dark:bg-slate-800 transition-all duration-300 pointer-events-none font-medium ${
            focusedField === 'message' || isFilled(formData.message)
              ? '-top-3 text-sm text-emerald-600 dark:text-emerald-400'
              : 'top-4 text-gray-500 dark:text-gray-400'
          } peer-focus:-top-3 peer-focus:text-sm peer-focus:text-emerald-600 dark:peer-focus:text-emerald-400`}
        >
          Your Message
        </label>
        {isFilled(formData.message) && getFieldValidation('message', formData.message) && (
          <div className="absolute right-4 top-4">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
        )}
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading || submitted}
        className="group relative w-full overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl disabled:shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100"
      >
        <div className="flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-lg">Sending...</span>
            </>
          ) : submitted ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span className="text-lg">Message Sent!</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              <span className="text-lg">Send Message</span>
            </>
          )}
        </div>
        
        {!isLoading && !submitted && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
        )}
      </button>

      {submitted && (
        <div className="flex items-center justify-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700/50 rounded-2xl">
          <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <span className="text-emerald-700 dark:text-emerald-300 font-medium">
            Thank you! We'll get back to you soon.
          </span>
        </div>
      )}
    </div>
  );
};

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl shadow-xl mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400 bg-clip-text text-transparent mb-4 leading-tight">
                Contact Us
              </h1>
              
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full mx-auto lg:mx-0 mb-6"></div>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Have questions, feedback, or need help? We'd love to hear from you. 
                Fill out the form and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="group p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-emerald-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email Us</h3>
                    <a
                      href="mailto:support@civix.com"
                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200 font-medium"
                    >
                      support@cityAlert.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="group p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-emerald-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Response Time</h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/30">
              <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-3">
                Why Contact Us?
              </h3>
              <ul className="space-y-2 text-emerald-700 dark:text-emerald-200">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Technical support and assistance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Feature requests and feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>General inquiries and questions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We'll respond to you as quickly as possible
                </p>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;