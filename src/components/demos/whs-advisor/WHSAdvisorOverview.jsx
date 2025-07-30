import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertTriangle, FileText, BarChart3, Users, Phone, ChevronRight, MessageCircle, X, Send, Activity, Eye, Zap, Clock } from 'lucide-react';

const WHSAdvisorOverview = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState([]);

  // Particle animation
  useEffect(() => {
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.2 + 0.1,
      opacity: Math.random() * 0.3 + 0.2,
      color: Math.random() > 0.5 ? 'cyan' : 'blue'
    }));
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y > 105 ? -5 : particle.y + particle.speed,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.1
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: CheckCircle,
      title: 'Risk Assessment',
      description: 'AI-powered workplace risk identification and mitigation strategies',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Eye,
      title: 'Compliance Monitoring',
      description: 'Real-time tracking of WHS regulatory compliance and obligations',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: AlertTriangle,
      title: 'Incident Reporting',
      description: 'Streamlined incident documentation and regulator notification',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Safety Analytics',
      description: 'Comprehensive insights and performance metrics for safety management',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: FileText,
      title: 'Legislative Guidance',
      description: 'Access to WHS Act, Regulations, and Codes of Practice with AI assistance',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Multi-Role Support',
      description: 'Tailored interfaces for employers, workers, and safety representatives',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const handleGetStarted = () => {
    setIsTransitioning(true);
    // In a real app, this would navigate to the next screen
    setTimeout(() => {
      alert('Transitioning to WHS Act & Regulations screen...');
      setIsTransitioning(false);
    }, 500);
  };

  const handleChatSubmit = (e) => {
    if (chatMessage.trim()) {
      // Simulate AI response
      alert(`AI Response to: "${chatMessage}"`);
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${particle.color === 'cyan' ? 'bg-cyan-400' : 'bg-blue-400'}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color === 'cyan' ? '#22d3ee' : '#3b82f6'}`
          }}
        />
      ))}

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, cyan 2px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-md border-b border-cyan-500/50 relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 relative">
              <Shield className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Work Health & Safety Advisor
              </h1>
              <p className="text-cyan-300 text-sm">AI-Powered Workplace Safety Management</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`container mx-auto px-6 py-12 relative z-10 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {/* Mission Statement */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-cyan-500/50 animate-pulse relative">
            <Shield className="w-12 h-12 text-white" />
            <div className="absolute inset-0 border-2 border-transparent border-t-cyan-400 border-r-blue-500 rounded-full animate-spin"></div>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Complete WHS Solution
          </h2>
          <p className="text-xl text-gray-300 mb-2 max-w-3xl mx-auto leading-relaxed">
            Streamline workplace safety compliance with AI-powered risk assessment, incident management, and regulatory guidance tailored for Australian workplaces.
          </p>
          <p className="text-lg text-cyan-300 max-w-2xl mx-auto">
            From WHS Act compliance to emergency response - everything you need to create safer workplaces.
          </p>
          
          {/* Live metrics */}
          <div className="flex items-center justify-center space-x-8 mt-6 text-sm">
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-green-500/30">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-green-400">96.8% Accuracy</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-blue-500/30">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400">Real-time Guidance</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full border border-purple-500/30">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">24/7 Available</span>
            </div>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Comprehensive Safety Management Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:border-cyan-500/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="relative">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Get Started Button */}
        <div className="text-center">
          <button
            onClick={handleGetStarted}
            disabled={isTransitioning}
            className="group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transform hover:scale-105 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <span className="text-lg">Get Started with WHS Guidance</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
          <p className="text-gray-400 text-sm mt-3">Start with WHS Act & Regulations lookup</p>
        </div>
      </main>

      {/* Chat with Docs Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <div className="bg-gray-800/95 backdrop-blur-md border border-cyan-500/50 rounded-lg w-80 h-96 shadow-2xl shadow-cyan-500/30">
            <div className="flex items-center justify-between p-4 border-b border-gray-600/50">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-cyan-400" />
                <h4 className="font-semibold text-white">Chat with WHS Docs</h4>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 h-64 overflow-y-auto">
              <div className="text-sm text-gray-300 bg-gray-700/50 rounded-lg p-3 mb-3">
                <strong className="text-cyan-300">AI Assistant:</strong> I can help you with WHS questions about legislation, compliance, incident procedures, and more. Try asking about duties, hazards, or specific WHS topics!
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-600/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about WHS compliance..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit(e)}
                />
                <button
                  onClick={handleChatSubmit}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-2 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-4 rounded-full shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300 transform hover:scale-110 group"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WHSAdvisorOverview;

