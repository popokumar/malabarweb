import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, MessageSquare, Headphones, Package } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  console.log('📞 ContactPage rendering');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our support team',
      contact: '+1 (555) 123-4567',
      hours: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      contact: 'support@onspacecommerce.com',
      hours: 'Response within 24 hours'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      contact: 'Available on website',
      hours: 'Mon-Fri 9AM-9PM EST'
    }
  ];

  const departments = [
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'General questions and assistance',
      email: 'support@onspacecommerce.com'
    },
    {
      icon: Package,
      title: 'Orders & Returns',
      description: 'Order status and return requests',
      email: 'orders@onspacecommerce.com'
    },
    {
      icon: MessageSquare,
      title: 'Business Inquiries',
      description: 'Partnerships and business opportunities',
      email: 'business@onspacecommerce.com'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Contact form submitted:', formData);

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('✅ Contact form submitted successfully');
      toast.success('Thank you! We\'ll get back to you within 24 hours.');
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
    } catch (error) {
      console.error('❌ Contact form submission failed:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container-fluid text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're here to help! Reach out to us with any questions, concerns, 
            or feedback. Our friendly team is ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section>
        <div className="container-fluid">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Reach Us</h2>
            <p className="text-muted-foreground">
              Choose the method that works best for you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{method.title}</h3>
                  <p className="text-muted-foreground text-sm">{method.description}</p>
                  <div className="font-medium text-primary">{method.contact}</div>
                  <p className="text-xs text-muted-foreground">{method.hours}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section>
        <div className="container-fluid">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="order">Order Support</SelectItem>
                        <SelectItem value="return">Returns & Refunds</SelectItem>
                        <SelectItem value="product">Product Inquiry</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="business">Business Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief subject of your message"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <div className="spinner w-4 h-4 mr-2" />
                    ) : null}
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Office Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">OnSpace Commerce Headquarters</p>
                    <p className="text-muted-foreground">
                      123 Commerce Street<br />
                      Business District<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Monday - Friday: 9:00 AM - 6:00 PM EST</span>
                  </div>
                </CardContent>
              </Card>

              {/* Department Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Contacts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <dept.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{dept.title}</h4>
                        <p className="text-sm text-muted-foreground">{dept.description}</p>
                        <a 
                          href={`mailto:${dept.email}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-2">Need Quick Answers?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Check out our FAQ section for instant answers to common questions.
                  </p>
                  <Button variant="secondary" size="sm">
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-muted">
        <div className="container-fluid py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Visit Our Store</h2>
            <p className="text-muted-foreground">
              Stop by our flagship location in the heart of the business district
            </p>
          </div>
          
          {/* Placeholder for map - in a real app, integrate with Google Maps */}
          <div className="aspect-video bg-border rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Interactive map would appear here</p>
              <p className="text-sm text-muted-foreground">
                123 Commerce Street, New York, NY 10001
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;