
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Target, Award, BarChart3, PieChart as PieChartIcon, 
  LineChart as LineChartIcon, Zap
} from 'lucide-react';

// Sample data for charts
const performanceData = [
  { name: 'Jan', sales: 4000, leads: 2400, traffic: 1200 },
  { name: 'Feb', sales: 3000, leads: 1398, traffic: 1500 },
  { name: 'Mar', sales: 2000, leads: 4800, traffic: 2200 },
  { name: 'Apr', sales: 2780, leads: 3908, traffic: 2500 },
  { name: 'May', sales: 1890, leads: 4800, traffic: 3100 },
  { name: 'Jun', sales: 2390, leads: 3800, traffic: 2800 },
  { name: 'Jul', sales: 3490, leads: 4300, traffic: 3300 },
];

const channelData = [
  { name: 'Social', value: 400 },
  { name: 'Email', value: 300 },
  { name: 'SEO', value: 300 },
  { name: 'PPC', value: 200 },
  { name: 'Direct', value: 100 },
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f97316', '#f43f5e'];

const audienceData = [
  { age: '18-24', male: 20, female: 25, other: 5 },
  { age: '25-34', male: 30, female: 35, other: 8 },
  { age: '35-44', male: 25, female: 30, other: 7 },
  { age: '45-54', male: 15, female: 20, other: 4 },
  { age: '55+', male: 10, female: 15, other: 3 },
];

export const MarketingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { name: 'Total Leads', value: '2,543', change: '+12.3%', icon: <Users className="h-5 w-5" />, color: 'text-blue-500' },
    { name: 'Revenue', value: '$34,123', change: '+8.1%', icon: <DollarSign className="h-5 w-5" />, color: 'text-green-500' },
    { name: 'Conversion Rate', value: '3.2%', change: '+0.4%', icon: <Target className="h-5 w-5" />, color: 'text-purple-500' },
    { name: 'ROI', value: '187%', change: '+22%', icon: <Award className="h-5 w-5" />, color: 'text-indigo-500' },
  ];

  return (
    <Card className="premium-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Marketing Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              className="bg-white rounded-lg p-3 shadow-sm border border-border/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                  <p className="text-xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full bg-gradient-to-br from-${stat.color.split('-')[1]}-100 to-${stat.color.split('-')[1]}-200 ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">{stat.change}</span>
                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
              </div>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Audience
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Channels
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-2">
            <div className="bg-white/80 rounded-lg p-4 border border-border/10">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <LineChartIcon className="h-4 w-4 mr-2 text-premium-blue" />
                Performance Trends
              </h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="traffic" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="bg-muted/10 p-2 rounded-md">
                  <div className="text-xs text-muted-foreground">Total Sales</div>
                  <div className="text-lg font-semibold">$18,540</div>
                </div>
                <div className="bg-muted/10 p-2 rounded-md">
                  <div className="text-xs text-muted-foreground">Total Leads</div>
                  <div className="text-lg font-semibold">2,543</div>
                </div>
                <div className="bg-muted/10 p-2 rounded-md">
                  <div className="text-xs text-muted-foreground">Total Traffic</div>
                  <div className="text-lg font-semibold">16,245</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="audience" className="pt-2">
            <div className="bg-white/80 rounded-lg p-4 border border-border/10">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <Users className="h-4 w-4 mr-2 text-premium-purple" />
                Audience Demographics
              </h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={audienceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="age" stroke="#888888" fontSize={12} />
                    <YAxis stroke="#888888" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" fill="#3b82f6" />
                    <Bar dataKey="female" fill="#ec4899" />
                    <Bar dataKey="other" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 flex justify-between bg-muted/10 p-3 rounded-md">
                <div>
                  <div className="text-xs text-muted-foreground">Primary Audience</div>
                  <div className="text-sm font-medium">Females 25-34</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Engagement Rate</div>
                  <div className="text-sm font-medium">4.2%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Retention Rate</div>
                  <div className="text-sm font-medium">68%</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="channels" className="pt-2">
            <div className="bg-white/80 rounded-lg p-4 border border-border/10">
              <h4 className="text-sm font-medium mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-premium-orange" />
                Channel Performance
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm font-medium mb-2">Channel Breakdown</div>
                  {channelData.map((channel, index) => (
                    <div key={channel.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm">{channel.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{channel.value}</span>
                        <span className="text-xs text-muted-foreground">({((channel.value / channelData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%)</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 pt-3 border-t border-border/10">
                    <div className="text-sm font-medium mb-2">Top Performing</div>
                    <div className="flex items-center justify-between bg-premium-blue/5 p-2 rounded-md">
                      <span className="text-sm">Social Media</span>
                      <span className="text-sm font-medium text-premium-blue">Conversion Rate: 4.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
