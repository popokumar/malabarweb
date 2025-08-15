import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Truck, Heart } from 'lucide-react';

const AboutPage = () => {
  console.log('ℹ️ AboutPage rendering');

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50,000+' },
    { icon: Award, label: 'Years of Experience', value: '10+' },
    { icon: Truck, label: 'Orders Delivered', value: '1M+' },
    { icon: Heart, label: 'Customer Rating', value: '4.9/5' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&fm=jpg&q=80',
      description: 'Leading the vision for exceptional customer experience'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&fm=jpg&q=80',
      description: 'Driving innovation in e-commerce technology'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&fm=jpg&q=80',
      description: 'Ensuring smooth operations and fast delivery'
    },
    {
      name: 'David Kim',
      role: 'Customer Success Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&fm=jpg&q=80',
      description: 'Dedicated to making every customer happy'
    }
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We carefully curate every product to ensure the highest quality standards for our customers.',
      icon: '✨'
    },
    {
      title: 'Customer Focused',
      description: 'Our customers are at the heart of everything we do. We strive to exceed expectations every day.',
      icon: '❤️'
    },
    {
      title: 'Innovation',
      description: 'We continuously innovate to provide the best shopping experience with cutting-edge technology.',
      icon: '🚀'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to sustainable practices and responsible business operations.',
      icon: '🌱'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container-fluid text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About OnSpace Commerce
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are passionate about delivering exceptional products and experiences 
            to customers worldwide. Since 2014, we've been building trust through 
            quality, service, and innovation.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section>
        <div className="container-fluid">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section>
        <div className="container-fluid">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  OnSpace Commerce began as a small startup with a big dream: to create 
                  the most customer-centric e-commerce platform in the world. Founded in 
                  2014 by a team of passionate entrepreneurs, we started with just a handful 
                  of products and an unwavering commitment to quality.
                </p>
                <p>
                  Over the years, we've grown from a small team working out of a garage 
                  to a thriving company serving customers across the globe. But our core 
                  values remain the same: put the customer first, never compromise on 
                  quality, and always strive for excellence.
                </p>
                <p>
                  Today, we're proud to offer over 25,000 carefully curated products 
                  from trusted brands and emerging innovators. Every item in our catalog 
                  is chosen with our customers in mind, ensuring that you receive only 
                  the best products with exceptional service.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&fm=jpg&q=80"
                alt="Our team at work"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted">
        <div className="container-fluid py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and help us create 
              meaningful experiences for our customers and partners.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center">
                <CardContent className="space-y-4">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="container-fluid">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind OnSpace Commerce who work every day 
              to make your shopping experience exceptional.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-fluid py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-lg opacity-90">
              To empower people around the world by providing access to high-quality 
              products, exceptional service, and innovative shopping experiences that 
              make life better, more convenient, and more enjoyable.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 pt-8">
              <div>
                <h4 className="font-semibold mb-2">Quality Products</h4>
                <p className="text-sm opacity-80">
                  Curated selection of premium items from trusted brands
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Exceptional Service</h4>
                <p className="text-sm opacity-80">
                  24/7 support and hassle-free returns for peace of mind
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Fast Delivery</h4>
                <p className="text-sm opacity-80">
                  Quick and reliable shipping to get you what you need
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;