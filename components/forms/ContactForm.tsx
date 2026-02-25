'use client';

import React, { useState } from 'react';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Mail, Phone, User, Building } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  category: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    category: 'general',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        category: 'general',
      });
      setIsSubmitted(false);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
          <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader
        title="Contact Us"
        subtitle="Fill out the form below and we'll get back to you as soon as possible"
      />
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange('name')}
              error={errors.name}
              leftIcon={<User size={18} />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange('email')}
              error={errors.email}
              leftIcon={<Mail size={18} />}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange('phone')}
              error={errors.phone}
              leftIcon={<Phone size={18} />}
              helperText="Optional"
            />

            <Input
              label="Company"
              placeholder="Acme Inc."
              value={formData.company}
              onChange={handleChange('company')}
              leftIcon={<Building size={18} />}
              helperText="Optional"
            />
          </div>

          <Select
            label="Category"
            value={formData.category}
            onChange={handleChange('category')}
            options={[
              { value: 'general', label: 'General Inquiry' },
              { value: 'support', label: 'Technical Support' },
              { value: 'sales', label: 'Sales Question' },
              { value: 'billing', label: 'Billing Issue' },
            ]}
          />

          <TextArea
            label="Message"
            placeholder="Tell us how we can help you..."
            value={formData.message}
            onChange={handleChange('message')}
            error={errors.message}
            rows={5}
            required
          />
        </CardContent>

        <CardFooter>
          <div className="flex items-center gap-4">
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="flex-1 md:flex-initial"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  message: '',
                  category: 'general',
                });
                setErrors({});
              }}
            >
              Clear Form
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContactForm;
