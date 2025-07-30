import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, AlertTriangle, Phone, FileText, MessageCircle, X, Send, ArrowLeft, ChevronRight, ChevronDown, ChevronUp, Clock, User, MapPin, Download, ExternalLink, Heart, Eye, Archive, Search } from 'lucide-react';

const WHSIncidentResponseScreen = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [completedSteps, setCompletedSteps] = useState({});
  const [expandedSteps, setExpandedSteps] = useState({});
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

  const incidentSteps = [
    {
      id: 'safety-first-aid',
      title: 'Ensure Immediate Safety & First Aid',
      urgency: 'critical',
      timeframe: 'Immediate',
      summary: 'Provide immediate assistance and remove dangers',
      icon: Heart,
      details: {
        actions: [
          'Assess the scene for ongoing dangers',
          'Provide first aid to injured persons',
          'Call 000 if emergency medical assistance needed',
          'Remove or isolate immediate hazards',
          'Ensure no one else is at risk'
        ],
        legalRequirement: 'PCBUs must ensure immediate assistance is provided to injured workers and that the workplace is made safe.',
        resources: [
          { name: 'First Aid Code of Practice', type: 'guide' },
          { name: 'Emergency Services: 000', type: 'contact' }
        ],
        tips: 'Only move an injured person if they are in immediate danger. Provide comfort and reassurance while waiting for help.'
      }
    },
    {
      id: 'notify-authorities',
      title: 'Notify Authorities (If Required)',
      urgency: 'critical',
      timeframe: 'Immediately',
      summary: 'Contact WHS regulator for notifiable incidents',
      icon: Phone,
      details: {
        actions: [
          'Determine if incident is notifiable (death, serious injury, dangerous incident)',
          'Contact state WHS regulator by phone immediately',
          'Provide initial incident details',
          'Follow up with written notification within 48 hours',
          'Notify workers\' compensation insurer if applicable'
        ],
        legalRequirement: 'Notifiable incidents must be reported to the WHS regulator immediately by phone, followed by written notice within 48 hours.',
        resources: [
          { name: 'SafeWork NSW: 13 10 50', type: 'contact' },
          { name: 'Notifiable Incident Form', type: 'form' },
          { name: 'What is a Notifiable Incident Guide', type: 'guide' }
        ],
        tips: 'When in doubt, report it. It\'s better to report an incident that turns out to be non-notifiable than to miss reporting a serious incident.'
      }
    },
    {
      id: 'preserve-scene',
      title: 'Preserve the Incident Site',
      urgency: 'high',
      timeframe: 'Until inspector arrives',
      summary: 'Secure and preserve the incident area',
      icon: MapPin,
      details: {
        actions: [
          'Do not disturb the incident site',
          'Restrict access to authorized personnel only',
          'Take photos if safe to do so',
          'Secure any equipment involved',
          'Maintain scene until inspector gives clearance'
        ],
        legalRequirement: 'The incident site must not be disturbed except to help injured persons or make the site safe.',
        resources: [
          { name: 'Scene Preservation Checklist', type: 'checklist' },
          { name: 'Photography Guidelines', type: 'guide' }
        ],
        tips: 'Mark the area clearly and keep unauthorized people away. Only disturb the scene if necessary for safety or to help injured persons.'
      }
    },
    {
      id: 'document-incident',
      title: 'Document the Incident',
      urgency: 'high',
      timeframe: 'Within 24 hours',
      summary: 'Record detailed incident information',
      icon: FileText,
      details: {
        actions: [
          'Complete internal incident report form',
          'Record witness statements',
          'Document what happened, when, where, who was involved',
          'Take photographs (if not already done)',
          'Gather relevant documents (procedures, training records)'
        ],
        legalRequirement: 'Accurate records must be kept of all workplace incidents for investigation and future prevention.',
        resources: [
          { name: 'Incident Report Template', type: 'form' },
          { name: 'Witness Statement Form', type: 'form' },
          { name: 'Investigation Guidelines', type: 'guide' }
        ],
        tips: 'Document facts, not opinions. Include details about environmental conditions, equipment status, and work processes at the time.'
      }
    },
    {
      id: 'begin-investigation',
      title: 'Begin Investigation',
      urgency: 'medium',
      timeframe: 'Within 48 hours',
      summary: 'Investigate root causes and contributing factors',
      icon: Search,
      details: {
        actions: [
          'Assemble investigation team (include worker representatives)',
          'Review incident circumstances and contributing factors',
          'Identify immediate and underlying causes',
          'Interview witnesses and involved parties',
          'Review relevant procedures and training'
        ],
        legalRequirement: 'PCBUs must investigate incidents to identify causes and prevent recurrence. Workers have the right to be involved in investigations.',
        resources: [
          { name: 'Incident Investigation Template', type: 'form' },
          { name: 'Root Cause Analysis Guide', type: 'guide' },
          { name: 'Investigation Techniques Manual', type: 'guide' }
        ],
        tips: 'Focus on system failures rather than individual blame. Look for multiple contributing factors and underlying causes.'
      }
    },
    {
      id: 'implement-controls',
      title: 'Implement Preventive Controls',
      urgency: 'medium',
      timeframe: 'As soon as practicable',
      summary: 'Take action to prevent similar incidents',
      icon: Shield,
      details: {
        actions: [
          'Develop corrective actions based on investigation findings',
          'Implement immediate temporary controls if needed',
          'Plan and implement long-term preventive measures',
          'Update procedures and training as necessary',
          'Communicate lessons learned to all workers'
        ],
        legalRequirement: 'PCBUs must take action to eliminate or reduce risks identified through incident investigation.',
        resources: [
          { name: 'Corrective Action Plan Template', type: 'form' },
          { name: 'Risk Control Hierarchy Guide', type: 'guide' },
          { name: 'Change Management Procedures', type: 'guide' }
        ],
        tips: 'Use the hierarchy of controls - eliminate, substitute, isolate, engineer, administrate, PPE. Address both immediate and underlying causes.'
      }
    }
  ];

  const toggleStep = (stepId) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const toggleExpanded = (stepId) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-amber-500 bg-amber-500/10';
      case 'medium': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-amber-500 text-white';
      case 'medium': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const totalSteps = incidentSteps.length;
  const progressPercentage = (completedCount / totalSteps) * 100;

  const handleChatSubmit = () => {
    if (chatMessage.trim()) {
      alert(`AI Response to: "${chatMessage}"`);
      setChatMessage('');
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      alert('Returning to Codes of Practice...');
      setIsTransitioning(false);
    }, 500);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      alert('Transitioning to Workers\' Compensation...');
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
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Incident Response Toolkit
                </h1>
                <p className="text-red-300 text-sm">Step-by-Step Emergency Response Guide</p>
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
        
        {/* Progress Overview */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Incident Response Progress</h2>
            <div className="text-right">
              <div className="text-sm text-gray-400">Completed Steps</div>
              <div className="text-2xl font-bold text-cyan-300">{completedCount}/{totalSteps}</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mb-4">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{width: `${progressPercentage}%`}}
            ></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
              <div className="text-red-300 text-sm">Critical</div>
              <div className="text-white font-semibold">Steps 1-2</div>
            </div>
            <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3">
              <div className="text-amber-300 text-sm">High Priority</div>
              <div className="text-white font-semibold">Steps 3-4</div>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
              <div className="text-blue-300 text-sm">Medium Priority</div>
              <div className="text-white font-semibold">Steps 5-6</div>
            </div>
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
              <div className="text-green-300 text-sm">Progress</div>
              <div className="text-white font-semibold">{Math.round(progressPercentage)}%</div>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mb-8 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-red-300 font-semibold text-lg mb-2">Emergency Response Priority</h3>
              <p className="text-red-200 mb-3">
                If someone is seriously injured or in immediate danger, call <strong>000</strong> first. 
                This toolkit helps manage the complete incident response process after ensuring immediate safety.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4 text-red-400" />
                  <span className="text-red-300">Emergency: 000</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300">SafeWork NSW: 13 10 50</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Incident Response Steps */}
        <div className="space-y-6">
          {incidentSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isCompleted = completedSteps[step.id];
            const isExpanded = expandedSteps[step.id];
            
            return (
              <div
                key={step.id}
                className={`bg-gray-800/50 backdrop-blur-sm border rounded-lg transition-all duration-300 ${getUrgencyColor(step.urgency)} ${isCompleted ? 'ring-2 ring-green-500/50' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Step Number & Completion */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-gray-700'}`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <span className="text-white font-bold">{index + 1}</span>
                        )}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <IconComponent className="w-5 h-5 text-cyan-400" />
                            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyBadge(step.urgency)}`}>
                              {step.urgency.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed mb-2">{step.summary}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Timeframe: {step.timeframe}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleStep(step.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isCompleted 
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                : 'bg-gray-700/50 text-gray-300 border border-gray-600/30 hover:bg-green-500/20 hover:text-green-300 hover:border-green-500/30'
                            }`}
                          >
                            {isCompleted ? 'Completed' : 'Mark Complete'}
                          </button>
                          
                          <button
                            onClick={() => toggleExpanded(step.id)}
                            className="p-2 text-gray-400 hover:text-cyan-300 transition-colors duration-200"
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-600/50 space-y-6">
                      {/* Actions Checklist */}
                      <div>
                        <h4 className="text-cyan-300 font-medium mb-3 flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Required Actions</span>
                        </h4>
                        <ul className="space-y-2">
                          {step.details.actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-300 text-sm">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Legal Requirement */}
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <h4 className="text-blue-300 font-medium mb-2 flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Legal Requirement</span>
                        </h4>
                        <p className="text-blue-200 text-sm leading-relaxed">{step.details.legalRequirement}</p>
                      </div>

                      {/* Resources */}
                      <div>
                        <h4 className="text-white font-medium mb-3">Resources & Forms</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {step.details.resources.map((resource, resourceIndex) => (
                            <div
                              key={resourceIndex}
                              className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3 hover:bg-gray-600/50 transition-colors duration-200"
                            >
                              <div className="flex items-center space-x-3">
                                {resource.type === 'contact' && <Phone className="w-4 h-4 text-green-400" />}
                                {resource.type === 'form' && <FileText className="w-4 h-4 text-blue-400" />}
                                {resource.type === 'guide' && <Eye className="w-4 h-4 text-purple-400" />}
                                {resource.type === 'checklist' && <CheckCircle className="w-4 h-4 text-amber-400" />}
                                <span className="text-gray-300 text-sm">{resource.name}</span>
                              </div>
                              {resource.type !== 'contact' && (
                                <button className="text-cyan-400 hover:text-cyan-300 text-xs transition-colors duration-200">
                                  <Download className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <h4 className="text-amber-300 font-medium mb-2 flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Important Tips</span>
                        </h4>
                        <p className="text-amber-200 text-sm leading-relaxed">{step.details.tips}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary & Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-600/50">
          {completedCount === totalSteps && (
            <div className="mb-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-green-300 font-semibold text-lg mb-2">Incident Response Complete</h3>
              <p className="text-green-200">
                All critical incident response steps have been completed. Continue with ongoing investigation and prevention activities.
              </p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-600/30 hover:border-cyan-500/50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Codes</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/30"
            >
              <span>Next: Workers' Compensation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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
                <strong className="text-cyan-300">AI Assistant:</strong> I can help you understand incident response procedures and requirements. Ask about notification requirements, investigation steps, or specific incident scenarios!
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-600/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about incident response..."
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

export default WHSIncidentResponseScreen;

