import React, { useState, useEffect } from 'react';
import { Megaphone, Shield, AlertTriangle, MessageCircle, X, Send, ArrowLeft, Home, Phone, User, Building, FileText, Eye, EyeOff, Clock, CheckCircle, ArrowRight, ExternalLink, AlertCircle, Users, Lock, Mail } from 'lucide-react';

const WHSComplaintsReportingScreen = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    concernType: '',
    description: '',
    location: '',
    witnessed: false,
    reporterName: '',
    contactDetails: '',
    anonymous: false,
    urgency: 'medium'
  });
  const [showPracticeForm, setShowPracticeForm] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState([]);

  // Particle animation
  useEffect(() => {
    const initialParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.15 + 0.08,
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

  const escalationSteps = [
    {
      id: 'direct-supervisor',
      title: 'Speak to Your Direct Supervisor',
      description: 'Start by raising the concern with your immediate supervisor or manager',
      icon: User,
      timeframe: 'First step',
      details: [
        'Clearly explain the safety concern or hazard',
        'Provide specific details about location and risks',
        'Request immediate action to address the issue',
        'Document the conversation and any agreed actions',
        'Set a reasonable timeframe for resolution'
      ],
      tips: 'Most safety issues can be resolved quickly at this level through direct communication.',
      nextStep: 'If no action is taken within a reasonable time, or if the issue is serious'
    },
    {
      id: 'hsr-safety-committee',
      title: 'Contact Health & Safety Representative',
      description: 'Escalate to your HSR or workplace safety committee',
      icon: Users,
      timeframe: 'If supervisor unresponsive',
      details: [
        'Contact your elected Health & Safety Representative',
        'Raise the issue at the next safety committee meeting',
        'HSR can investigate and make formal recommendations',
        'HSR has powers to direct unsafe work to cease',
        'Request formal response to safety concerns'
      ],
      tips: 'HSRs have special powers under WHS laws and can be very effective advocates.',
      nextStep: 'If internal processes fail or for serious immediate risks'
    },
    {
      id: 'union-representative',
      title: 'Contact Union Representative',
      description: 'Involve your union if you are a member',
      icon: Shield,
      timeframe: 'For complex issues',
      details: [
        'Contact your union organizer or safety representative',
        'Unions can provide advice and support',
        'May assist with formal complaints process',
        'Can advocate on your behalf with management',
        'Provide protection against discrimination'
      ],
      tips: 'Unions have experience with safety issues and know your rights and protections.',
      nextStep: 'For unresolved issues or when workplace processes have been exhausted'
    },
    {
      id: 'external-regulator',
      title: 'Report to WHS Regulator',
      description: 'Make a formal complaint to the state WHS authority',
      icon: Building,
      timeframe: 'Final escalation',
      details: [
        'Contact SafeWork NSW or your state regulator',
        'Use online reporting tools or phone hotlines',
        'Provide detailed information about the hazard',
        'Regulator may inspect and take enforcement action',
        'You are protected from retaliation for reporting'
      ],
      tips: 'Regulators take safety complaints seriously and have powers to issue fines and orders.',
      nextStep: 'Regulator will investigate and take appropriate action'
    }
  ];

  const reportingChannels = [
    {
      name: 'SafeWork NSW Speak Up Tool',
      description: 'Anonymous online reporting for NSW workplaces',
      type: 'online',
      features: ['Anonymous', 'Confidential', 'Quick & Easy'],
      contact: 'safework.nsw.gov.au/speak-up'
    },
    {
      name: 'SafeWork NSW Incident Line',
      description: 'Phone reporting for urgent safety concerns',
      type: 'phone',
      features: ['24/7 Available', 'Immediate Response', 'Expert Advice'],
      contact: '13 10 50'
    },
    {
      name: 'Work Health & Safety Entry Permit Holders',
      description: 'Union safety representatives with entry rights',
      type: 'representative',
      features: ['Worker Advocacy', 'Investigation Powers', 'Legal Protection'],
      contact: 'Contact your union'
    },
    {
      name: 'Legal Aid Safety Clinics',
      description: 'Free legal advice for serious safety issues',
      type: 'legal',
      features: ['Free Advice', 'Legal Expertise', 'Complex Issues'],
      contact: 'Legal Aid NSW'
    }
  ];

  const protections = [
    {
      type: 'No Discrimination',
      description: 'It is illegal for employers to discriminate against workers who report safety concerns',
      icon: Shield
    },
    {
      type: 'Anonymous Reporting',
      description: 'Many reporting channels allow anonymous complaints to protect your identity',
      icon: EyeOff
    },
    {
      type: 'Confidentiality',
      description: 'Regulators protect the identity of complainants wherever possible',
      icon: Lock
    },
    {
      type: 'Legal Remedies',
      description: 'If you face retaliation, you have legal options for protection and compensation',
      icon: FileText
    }
  ];

  const handleFormSubmit = () => {
    alert('Practice form submitted! In a real scenario, this would be sent to the appropriate authority.');
    setShowPracticeForm(false);
    setFormData({
      concernType: '',
      description: '',
      location: '',
      witnessed: false,
      reporterName: '',
      contactDetails: '',
      anonymous: false,
      urgency: 'medium'
    });
  };

  const handleChatSubmit = () => {
    if (chatMessage.trim()) {
      alert(`AI Response to: "${chatMessage}"`);
      setChatMessage('');
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      alert('Returning to Workers\' Compensation...');
      setIsTransitioning(false);
    }, 500);
  };

  const handleReturnToStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      alert('Returning to WHS Advisor Overview...');
      setIsTransitioning(false);
    }, 500);
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
            filter: 'blur(0.5px)'
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Safety Complaints & Reporting
                </h1>
                <p className="text-orange-300 text-sm">Raise Concerns & Report Hazards Safely</p>
              </div>
            </div>
            
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-600/30 hover:border-cyan-500/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`container mx-auto px-6 py-8 relative z-10 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        {/* Introduction */}
        <div className="mb-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Megaphone className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-orange-300 font-semibold text-xl mb-3">Your Right to a Safe Workplace</h2>
              <p className="text-orange-200 mb-4 leading-relaxed">
                Every worker has the right to a safe workplace. If you identify hazards or safety concerns, 
                you have the right and responsibility to report them. This guide shows you how to raise concerns 
                effectively and safely.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">Protected by Law</span>
                </div>
                <div className="flex items-center space-x-1">
                  <EyeOff className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300">Anonymous Options Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Escalation Flowchart */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Step-by-Step Escalation Process</h3>
          
          <div className="space-y-6">
            {escalationSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === index;
              
              return (
                <div key={step.id} className="relative">
                  {/* Connector Line */}
                  {index < escalationSteps.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-12 bg-gradient-to-b from-cyan-500 to-blue-600"></div>
                  )}
                  
                  <div
                    className={`bg-gray-800/50 backdrop-blur-sm border rounded-lg transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' 
                        : 'border-gray-600/50 hover:border-cyan-500/50'
                    }`}
                    onClick={() => setCurrentStep(isActive ? -1 : index)}
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30' 
                            : 'bg-gray-700'
                        }`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                              <p className="text-gray-300 text-sm leading-relaxed mb-2">{step.description}</p>
                              <div className="flex items-center space-x-1 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>{step.timeframe}</span>
                              </div>
                            </div>
                            
                            <div className="text-gray-400">
                              <ArrowRight className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {isActive && (
                        <div className="mt-6 pt-6 border-t border-gray-600/50 space-y-4">
                          {/* Detailed Actions */}
                          <div>
                            <h5 className="text-cyan-300 font-medium mb-3">What to Do</h5>
                            <ul className="space-y-2">
                              {step.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-start space-x-3">
                                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-300 text-sm">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tips */}
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                            <h5 className="text-blue-300 font-medium mb-2">💡 Tips</h5>
                            <p className="text-blue-200 text-sm leading-relaxed">{step.tips}</p>
                          </div>

                          {/* Next Step */}
                          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                            <h5 className="text-amber-300 font-medium mb-2">When to Escalate</h5>
                            <p className="text-amber-200 text-sm leading-relaxed">{step.nextStep}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reporting Channels */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Official Reporting Channels</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportingChannels.map((channel, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300">
                <div className="flex items-start space-x-3 mb-4">
                  {channel.type === 'online' && <ExternalLink className="w-6 h-6 text-cyan-400 mt-1" />}
                  {channel.type === 'phone' && <Phone className="w-6 h-6 text-green-400 mt-1" />}
                  {channel.type === 'representative' && <Users className="w-6 h-6 text-purple-400 mt-1" />}
                  {channel.type === 'legal' && <FileText className="w-6 h-6 text-amber-400 mt-1" />}
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">{channel.name}</h4>
                    <p className="text-gray-300 text-sm mb-3">{channel.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {channel.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-cyan-300 font-medium text-sm">
                      {channel.contact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Reporting Form */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Practice Reporting Form</h3>
            <button
              onClick={() => setShowPracticeForm(!showPracticeForm)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/30"
            >
              {showPracticeForm ? 'Hide Form' : 'Try Practice Form'}
            </button>
          </div>

          {showPracticeForm && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6">
              <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-amber-300 font-medium mb-1">Practice Form Only</h4>
                    <p className="text-amber-200 text-sm">This is a demonstration form. No real reports will be submitted.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Concern Type */}
                <div>
                  <label className="block text-white font-medium mb-2">Type of Safety Concern</label>
                  <select
                    value={formData.concernType}
                    onChange={(e) => setFormData({...formData, concernType: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  >
                    <option value="">Select concern type...</option>
                    <option value="hazard">Workplace Hazard</option>
                    <option value="unsafe-practice">Unsafe Work Practice</option>
                    <option value="equipment">Faulty Equipment</option>
                    <option value="environment">Unsafe Environment</option>
                    <option value="discrimination">Safety Discrimination</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white font-medium mb-2">Description of Concern</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the safety concern in detail..."
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-white font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Where did this occur? (building, area, equipment)"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-white font-medium mb-2">Urgency Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['low', 'medium', 'high'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFormData({...formData, urgency: level})}
                        className={`p-3 rounded-lg border transition-all duration-200 ${
                          formData.urgency === level
                            ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={formData.anonymous}
                    onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}
                    className="w-4 h-4 text-cyan-500 border-gray-600 rounded focus:ring-cyan-500"
                  />
                  <label htmlFor="anonymous" className="text-white">
                    Submit anonymously (your identity will not be shared)
                  </label>
                </div>

                {/* Contact Details (if not anonymous) */}
                {!formData.anonymous && (
                  <div className="space-y-4 p-4 bg-gray-700/30 rounded-lg">
                    <div>
                      <label className="block text-white font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        value={formData.reporterName}
                        onChange={(e) => setFormData({...formData, reporterName: e.target.value})}
                        placeholder="Full name"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Contact Details</label>
                      <input
                        type="text"
                        value={formData.contactDetails}
                        onChange={(e) => setFormData({...formData, contactDetails: e.target.value})}
                        placeholder="Phone or email"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleFormSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/30"
                >
                  Submit Practice Report
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Legal Protections */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Your Legal Protections</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protections.map((protection, index) => {
              const IconComponent = protection.icon;
              return (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{protection.type}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{protection.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What to Expect */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">What Happens After You Report?</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Acknowledgment</h4>
                <p className="text-gray-300 text-sm">You should receive acknowledgment of your report within 7 days</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Investigation</h4>
                <p className="text-gray-300 text-sm">The regulator or workplace will investigate your concern</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Action</h4>
                <p className="text-gray-300 text-sm">Appropriate action will be taken to address the safety issue</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <h4 className="text-white font-medium">Follow-up</h4>
                <p className="text-gray-300 text-sm">You may be contacted for additional information or updates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-600/50">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-600/30 hover:border-cyan-500/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Compensation</span>
          </button>

          <button
            onClick={handleReturnToStart}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-green-500/30"
          >
            <Home className="w-4 h-4" />
            <span>Return to Start</span>
          </button>
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
                <strong className="text-cyan-300">AI Assistant:</strong> I can help you understand how to report safety concerns and your rights when making complaints. Ask about escalation procedures, anonymous reporting, or legal protections!
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-600/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about reporting concerns..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
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

export default WHSComplaintsReportingScreen;

