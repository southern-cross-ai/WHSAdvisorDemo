import React, { useState, useEffect } from 'react';
import { Heart, Users, HardHat, FileText, MessageCircle, X, Send, ArrowLeft, ChevronRight, DollarSign, Clock, Shield, Phone, Download, ExternalLink, CheckCircle, AlertCircle, User, Building, Calendar, Stethoscope, ArrowRight } from 'lucide-react';

const WHSCompensationScreen = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [userType, setUserType] = useState('worker'); // 'worker' or 'employer'
  const [selectedStep, setSelectedStep] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState([]);

// Particle animation
  useEffect(() => {
    const initialParticles = Array.from({ length: 8 }, (_, i) => ({  // CHANGED: reduced from 12 to 8 particles
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,                  // CHANGED: increased max size from 2 to 3
      speed: Math.random() * 0.1 + 0.05,            // CHANGED: slower speeds
      opacity: Math.random() * 0.2 + 0.1,           // CHANGED: lower opacity range
      color: Math.random() > 0.5 ? 'teal' : 'green' // CHANGED: teal/green instead of cyan/blue
    }));
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: p.y > 105 ? -5 : p.y + p.speed,
        x: p.x + Math.sin(Date.now() * 0.001 + p.id) * 0.05 // CHANGED: reduced horizontal movement
      })));
    }, 80);                                         // CHANGED: interval from 50ms to 80ms


    return () => clearInterval(interval);
  }, []);

  const workerContent = {
    overview: {
      title: "Your Rights to Workers' Compensation",
      description: "If you're injured at work, you have rights to compensation and support for your recovery.",
      keyPoints: [
        "Immediate medical treatment coverage",
        "Weekly payments while unable to work",
        "Rehabilitation and return to work support",
        "Coverage for work-related injuries and illnesses"
      ]
    },
    steps: [
      {
        id: 'seek-treatment',
        title: 'Seek Immediate Medical Treatment',
        icon: Stethoscope,
        summary: 'Get medical attention and ensure your injury is properly assessed',
        timeframe: 'Immediately after injury',
        details: {
          actions: [
            'Seek immediate medical attention if seriously injured',
            'Inform the doctor that it\'s a work-related injury',
            'Keep all medical certificates and reports',
            'Follow all medical advice and treatment plans',
            'Attend all medical appointments'
          ],
          rights: 'You have the right to choose your own doctor for treatment of work injuries.',
          tips: 'Always mention that your injury is work-related to ensure proper documentation and coverage.'
        }
      },
      {
        id: 'report-injury',
        title: 'Report Your Injury to Your Employer',
        icon: User,
        summary: 'Notify your employer about the injury as soon as possible',
        timeframe: 'Within 30 days (immediately if possible)',
        details: {
          actions: [
            'Report the injury to your supervisor or manager immediately',
            'Complete any workplace injury report forms',
            'Provide details about how, when, and where the injury occurred',
            'Keep copies of all completed forms',
            'Get witness statements if available'
          ],
          rights: 'You cannot be penalized or discriminated against for reporting a work injury.',
          tips: 'Report even minor injuries - they may become more serious over time.'
        }
      },
      {
        id: 'lodge-claim',
        title: 'Lodge Your Workers\' Compensation Claim',
        icon: FileText,
        summary: 'Submit your claim for compensation benefits',
        timeframe: 'Within 6 months of injury',
        details: {
          actions: [
            'Complete the workers\' compensation claim form',
            'Provide medical certificates and reports',
            'Submit the claim to your employer\'s insurer',
            'Keep copies of all submitted documents',
            'Follow up if you don\'t receive acknowledgment within 7 days'
          ],
          rights: 'You have 6 months to lodge a claim, but earlier is better for faster processing.',
          tips: 'Your employer should help you with the claim process and provide insurer details.'
        }
      },
      {
        id: 'receive-benefits',
        title: 'Receive Your Benefits',
        icon: DollarSign,
        summary: 'Understand what compensation you\'re entitled to receive',
        timeframe: 'Ongoing during recovery',
        details: {
          actions: [
            'Medical expenses should be covered directly by the insurer',
            'Weekly payments start after first week off work',
            'Payments are typically 95% of pre-injury wages',
            'Keep track of all expenses related to your injury',
            'Report any changes in your condition or work capacity'
          ],
          rights: 'You\'re entitled to weekly payments, medical coverage, and rehabilitation support.',
          tips: 'Weekly payments may be reviewed periodically based on your recovery progress.'
        }
      },
      {
        id: 'return-to-work',
        title: 'Plan Your Return to Work',
        icon: ArrowRight,
        summary: 'Work with your employer and insurer on returning to work safely',
        timeframe: 'When medically cleared',
        details: {
          actions: [
            'Participate in return to work planning meetings',
            'Consider graduated return to work options',
            'Discuss workplace modifications if needed',
            'Communicate any ongoing limitations or concerns',
            'Continue medical treatment as required'
          ],
          rights: 'You have the right to return to your pre-injury job if medically able.',
          tips: 'A gradual return to work often helps with recovery and reduces re-injury risk.'
        }
      }
    ],
    entitlements: [
      { type: 'Medical Expenses', description: 'All reasonable medical, hospital, and rehabilitation costs', coverage: '100%' },
      { type: 'Weekly Payments', description: 'Income support while unable to work', coverage: '95% of wages' },
      { type: 'Lump Sum Benefits', description: 'For permanent impairment (if applicable)', coverage: 'Varies' },
      { type: 'Death Benefits', description: 'Support for dependents in case of work-related death', coverage: 'Statutory amount' }
    ],
    resources: [
      { name: 'Workers\' Compensation Claim Form', type: 'form', state: 'NSW' },
      { name: 'Medical Certificate Template', type: 'form', state: 'All States' },
      { name: 'SIRA NSW Information Line', type: 'contact', details: '1300 656 919' },
      { name: 'Workers\' Rights Factsheet', type: 'guide', state: 'NSW' }
    ]
  };

  const employerContent = {
    overview: {
      title: "Employer Obligations for Workers' Compensation",
      description: "When a worker is injured, you have specific obligations to support them and manage the claim process.",
      keyPoints: [
        "Provide immediate assistance and medical attention",
        "Report injuries to your workers' compensation insurer",
        "Support the worker through the claims process",
        "Facilitate safe return to work when possible"
      ]
    },
    steps: [
      {
        id: 'immediate-response',
        title: 'Provide Immediate Assistance',
        icon: Heart,
        summary: 'Ensure the injured worker receives prompt medical attention',
        timeframe: 'Immediately after injury',
        details: {
          actions: [
            'Ensure injured worker receives immediate medical attention',
            'Call emergency services if serious injury',
            'Provide first aid if trained and safe to do so',
            'Make the workplace safe to prevent further injuries',
            'Show concern and support for the injured worker'
          ],
          obligations: 'You must provide immediate assistance and ensure the worker gets medical treatment.',
          tips: 'Your response to an injury affects worker confidence and can impact claim costs.'
        }
      },
      {
        id: 'report-insurer',
        title: 'Report to Your Insurer',
        icon: Phone,
        summary: 'Notify your workers\' compensation insurer about the injury',
        timeframe: 'Within 48 hours',
        details: {
          actions: [
            'Contact your workers\' compensation insurer immediately',
            'Provide initial injury details and circumstances',
            'Complete insurer\'s incident notification form',
            'Provide worker\'s employment and wage details',
            'Submit medical certificates when received'
          ],
          obligations: 'You must report all workplace injuries to your insurer within 48 hours.',
          tips: 'Early reporting helps ensure faster processing and better outcomes for everyone.'
        }
      },
      {
        id: 'assist-claim',
        title: 'Assist with Claim Process',
        icon: FileText,
        summary: 'Help the worker complete their compensation claim',
        timeframe: 'Within 7 days of receiving claim',
        details: {
          actions: [
            'Help worker complete claim forms if needed',
            'Provide employment and wage information',
            'Submit employer section of claim form promptly',
            'Provide insurer contact details to the worker',
            'Maintain confidentiality of worker\'s medical information'
          ],
          obligations: 'You must assist workers with the claim process and provide required employment information.',
          tips: 'Being helpful and supportive during the claim process builds trust and aids recovery.'
        }
      },
      {
        id: 'support-recovery',
        title: 'Support Worker Recovery',
        icon: Shield,
        summary: 'Maintain contact and support the worker\'s rehabilitation',
        timeframe: 'Throughout recovery period',
        details: {
          actions: [
            'Maintain regular, supportive contact with injured worker',
            'Participate in return to work planning meetings',
            'Consider workplace modifications to accommodate limitations',
            'Provide suitable duties within worker\'s capacity',
            'Keep detailed records of all interactions and arrangements'
          ],
          obligations: 'You must cooperate with rehabilitation and return to work programs.',
          tips: 'Early and ongoing engagement in return to work planning reduces claim duration and costs.'
        }
      },
      {
        id: 'return-to-work',
        title: 'Facilitate Return to Work',
        icon: Building,
        summary: 'Develop and implement return to work arrangements',
        timeframe: 'When worker is medically cleared',
        details: {
          actions: [
            'Develop return to work plan with worker and insurer',
            'Identify suitable duties within medical restrictions',
            'Modify workplace or equipment if necessary',
            'Provide training for modified duties if needed',
            'Monitor worker\'s progress and adjust plan as needed'
          ],
          obligations: 'You must provide suitable employment to injured workers when they\'re able to return.',
          tips: 'Successful return to work programs benefit both workers and employers through reduced costs and improved morale.'
        }
      }
    ],
    obligations: [
      { type: 'Insurance Coverage', description: 'Maintain current workers\' compensation insurance', requirement: 'Mandatory for all employers' },
      { type: 'Injury Reporting', description: 'Report all workplace injuries to insurer', requirement: 'Within 48 hours' },
      { type: 'Claim Support', description: 'Assist workers with compensation claims', requirement: 'Within 7 days' },
      { type: 'Return to Work', description: 'Provide suitable duties for returning workers', requirement: 'When medically cleared' }
    ],
    resources: [
      { name: 'Employer Injury Report Form', type: 'form', state: 'NSW' },
      { name: 'Return to Work Plan Template', type: 'form', state: 'All States' },
      { name: 'Workers\' Compensation Guide for Employers', type: 'guide', state: 'NSW' },
      { name: 'SIRA NSW Employer Helpline', type: 'contact', details: '1300 656 919' }
    ]
  };

  const currentContent = userType === 'worker' ? workerContent : employerContent;

  const handleChatSubmit = () => {
    if (chatMessage.trim()) {
      alert(`AI Response to: "${chatMessage}"`);
      setChatMessage('');
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      alert('Returning to Incident Response...');
      setIsTransitioning(false);
    }, 500);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      alert('Transitioning to Safety Complaints...');
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
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Workers' Compensation Guide
                </h1>
                <p className="text-green-300 text-sm">Rights, Obligations & Claims Process</p>
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
        
        {/* Role Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setUserType('worker')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                  userType === 'worker'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>👷 Worker View</span>
              </button>
              <button
                onClick={() => setUserType('employer')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                  userType === 'employer'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <HardHat className="w-4 h-4" />
                <span>👨‍💼 Employer View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">{currentContent.overview.title}</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">{currentContent.overview.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentContent.overview.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-6">
            {userType === 'worker' ? 'Your Step-by-Step Guide' : 'Your Obligations & Process'}
          </h3>
          
          <div className="space-y-6">
            {currentContent.steps.map((step, index) => {
              const IconComponent = step.icon;
              const isSelected = selectedStep === step.id;
              
              return (
                <div
                  key={step.id}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg transition-all duration-300 hover:border-cyan-500/50"
                >
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => setSelectedStep(isSelected ? null : step.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <IconComponent className="w-5 h-5 text-cyan-400" />
                              <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed mb-2">{step.summary}</p>
                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              <span>{step.timeframe}</span>
                            </div>
                          </div>
                          
                          <div className="text-gray-400">
                            {isSelected ? <ChevronRight className="w-5 h-5 rotate-90 transition-transform duration-200" /> : <ChevronRight className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="px-6 pb-6 border-t border-gray-600/50">
                      <div className="mt-6 space-y-4">
                        {/* Actions */}
                        <div>
                          <h5 className="text-cyan-300 font-medium mb-3">Required Actions</h5>
                          <ul className="space-y-2">
                            {step.details.actions.map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-start space-x-3">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-300 text-sm">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Rights/Obligations */}
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <h5 className="text-blue-300 font-medium mb-2">
                            {userType === 'worker' ? 'Your Rights' : 'Your Obligations'}
                          </h5>
                          <p className="text-blue-200 text-sm leading-relaxed">
                            {userType === 'worker' ? step.details.rights : step.details.obligations}
                          </p>
                        </div>

                        {/* Tips */}
                        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                          <h5 className="text-amber-300 font-medium mb-2">Important Tips</h5>
                          <p className="text-amber-200 text-sm leading-relaxed">{step.details.tips}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Entitlements/Obligations Table */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">
            {userType === 'worker' ? 'Your Entitlements' : 'Your Key Obligations'}
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600/50">
                  <th className="text-left py-3 text-cyan-300 font-medium">
                    {userType === 'worker' ? 'Benefit Type' : 'Obligation'}
                  </th>
                  <th className="text-left py-3 text-cyan-300 font-medium">Description</th>
                  <th className="text-left py-3 text-cyan-300 font-medium">
                    {userType === 'worker' ? 'Coverage' : 'Requirement'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(userType === 'worker' ? currentContent.entitlements : currentContent.obligations).map((item, index) => (
                  <tr key={index} className="border-b border-gray-700/30">
                    <td className="py-3 text-white font-medium">{item.type}</td>
                    <td className="py-3 text-gray-300">{item.description}</td>
                    <td className="py-3 text-green-400 font-medium">
                      {userType === 'worker' ? item.coverage : item.requirement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resources */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">Resources & Forms</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentContent.resources.map((resource, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4 hover:bg-gray-600/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  {resource.type === 'contact' && <Phone className="w-5 h-5 text-green-400" />}
                  {resource.type === 'form' && <FileText className="w-5 h-5 text-blue-400" />}
                  {resource.type === 'guide' && <Download className="w-5 h-5 text-purple-400" />}
                  
                  <div>
                    <div className="text-white font-medium">{resource.name}</div>
                    {resource.details && (
                      <div className="text-green-300 text-sm">{resource.details}</div>
                    )}
                    {resource.state && (
                      <div className="text-gray-400 text-xs">{resource.state}</div>
                    )}
                  </div>
                </div>
                
                {resource.type !== 'contact' && (
                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-600/50">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-600/30 hover:border-cyan-500/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Incident Response</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/30"
          >
            <span>Next: Safety Complaints</span>
            <ChevronRight className="w-4 h-4" />
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
                <strong className="text-cyan-300">AI Assistant:</strong> I can help you understand workers' compensation rights, obligations, and processes. Ask about claim procedures, entitlements, or employer responsibilities!
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-600/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about compensation..."
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

export default WHSCompensationScreen;

