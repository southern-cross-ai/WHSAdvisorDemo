import React, { useState, useEffect } from 'react';
import { Book, Search, Grid, List, ChevronDown, ChevronUp, ExternalLink, MessageCircle, X, Send, ArrowLeft, ChevronRight, FileText, AlertCircle, CheckCircle, Users, HardHat, Calendar, Download } from 'lucide-react';

const WHSCodesOfPracticeScreen = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userType, setUserType] = useState('employer'); // 'employer' or 'worker'
  const [expandedCodes, setExpandedCodes] = useState({});
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

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'workplace-environment', label: 'Workplace Environment' },
    { id: 'manual-handling', label: 'Manual Handling' },
    { id: 'emergency-response', label: 'Emergency Response' },
    { id: 'hazardous-substances', label: 'Hazardous Substances' },
    { id: 'construction', label: 'Construction Work' },
    { id: 'plant-equipment', label: 'Plant & Equipment' }
  ];

  const codesOfPractice = [
    {
      id: 'first-aid',
      title: 'First Aid in the Workplace',
      category: 'workplace-environment',
      lastUpdated: 'July 2024',
      status: 'current',
      summary: 'Requirements for first aid facilities, equipment, and trained personnel in workplaces',
      employerContent: 'PCBUs must provide adequate first aid equipment, facilities, and ensure trained first aiders are available. Risk assessment determines specific requirements based on workplace hazards and worker numbers.',
      workerContent: 'You have the right to access first aid when needed. Know where first aid kits are located and who your trained first aiders are. Report any injuries immediately, even minor ones.',
      keyPoints: [
        'Risk-based approach to first aid provision',
        'Training requirements for first aiders',
        'Equipment and facility standards',
        'Record keeping obligations'
      ],
      whatThisMeans: 'Every workplace must have appropriate first aid resources available when workers are present, sized according to the risks and number of people.'
    },
    {
      id: 'hazardous-manual-tasks',
      title: 'Hazardous Manual Tasks',
      category: 'manual-handling',
      lastUpdated: 'June 2024',
      status: 'current',
      summary: 'Preventing musculoskeletal disorders from lifting, carrying, pushing, pulling activities',
      employerContent: 'Identify hazardous manual tasks through risk assessment. Implement control measures following the hierarchy: eliminate, reduce, redesign tasks, provide training and PPE.',
      workerContent: 'Use proper lifting techniques, ask for help with heavy items, and report pain or discomfort early. You can refuse tasks that pose immediate risk of injury.',
      keyPoints: [
        'Risk factors: force, posture, repetition, duration',
        'Hierarchy of control measures',
        'Job design and workplace layout',
        'Training and consultation requirements'
      ],
      whatThisMeans: 'Work involving manual handling must be designed to prevent back injuries and other musculoskeletal problems through good task design and training.'
    },
    {
      id: 'emergency-plans',
      title: 'Emergency Plans',
      category: 'emergency-response',
      lastUpdated: 'August 2024',
      status: 'current',
      summary: 'Developing and implementing emergency procedures for workplace incidents',
      employerContent: 'Develop written emergency procedures covering evacuation, communication, and coordination with emergency services. Conduct regular drills and maintain emergency equipment.',
      workerContent: 'Know your emergency procedures, evacuation routes, and assembly points. Participate in emergency drills and report any concerns about emergency preparedness.',
      keyPoints: [
        'Emergency procedure development',
        'Evacuation plans and routes',
        'Communication systems',
        'Training and drill requirements'
      ],
      whatThisMeans: 'Every workplace needs clear, practiced procedures for emergencies like fires, chemical spills, or medical emergencies to protect everyone on site.'
    },
    {
      id: 'managing-risks',
      title: 'Managing Risks to Health and Safety',
      category: 'workplace-environment',
      lastUpdated: 'May 2024',
      status: 'current',
      summary: 'Systematic approach to identifying, assessing and controlling workplace hazards',
      employerContent: 'Implement a systematic risk management process: identify hazards, assess risks, control risks using hierarchy of controls, and review effectiveness regularly.',
      workerContent: 'Help identify hazards in your workplace and follow safety procedures. Report new hazards or incidents immediately and participate in safety consultations.',
      keyPoints: [
        'Hazard identification methods',
        'Risk assessment techniques',
        'Hierarchy of control measures',
        'Review and monitoring processes'
      ],
      whatThisMeans: 'All workplace risks must be systematically identified and controlled using the most effective methods available, starting with elimination where possible.'
    },
    {
      id: 'construction-work',
      title: 'Construction Work',
      category: 'construction',
      lastUpdated: 'September 2024',
      status: 'current',
      summary: 'Safety requirements for construction activities including high-risk work',
      employerContent: 'Develop safe work method statements for high-risk construction work. Ensure proper licensing, supervision, and safety measures for activities like working at height.',
      workerContent: 'Follow safe work procedures, use required PPE, and only perform work you are trained and licensed for. Stop work if conditions become unsafe.',
      keyPoints: [
        'High-risk construction work licensing',
        'Safe work method statements',
        'Fall protection requirements',
        'Plant and equipment safety'
      ],
      whatThisMeans: 'Construction work has specific safety requirements due to higher risks, including mandatory safety planning and licensed operators for certain activities.'
    },
    {
      id: 'plant-equipment',
      title: 'Managing the Risks of Plant in the Workplace',
      category: 'plant-equipment',
      lastUpdated: 'April 2024',
      status: 'current',
      summary: 'Safety requirements for machinery, equipment and plant operation and maintenance',
      employerContent: 'Ensure plant is properly designed, manufactured, supplied, installed, and maintained. Provide training and supervision for operators and maintain safety systems.',
      workerContent: 'Only operate plant you are trained and authorized to use. Report faults immediately and follow lockout/tagout procedures during maintenance.',
      keyPoints: [
        'Plant design and installation requirements',
        'Operator training and competency',
        'Maintenance and inspection schedules',
        'Guarding and safety systems'
      ],
      whatThisMeans: 'All machinery and equipment must be safe by design, properly maintained, and operated only by trained personnel with appropriate safety measures in place.'
    }
  ];

  const toggleCode = (codeId) => {
    setExpandedCodes(prev => ({
      ...prev,
      [codeId]: !prev[codeId]
    }));
  };

  const filteredCodes = codesOfPractice.filter(code => {
    const matchesCategory = selectedCategory === 'all' || code.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      code.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleChatSubmit = () => {
    if (chatMessage.trim()) {
      alert(`AI Response to: "${chatMessage}"`);
      setChatMessage('');
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      alert('Returning to WHS Act & Regulations...');
      setIsTransitioning(false);
    }, 500);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      alert('Transitioning to Incident Response...');
      setIsTransitioning(false);
    }, 500);
  };

  const CodeCard = ({ code }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-medium">
                {code.status.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{code.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">{code.summary}</p>
            
            <div className="flex items-center space-x-4 text-xs text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Updated {code.lastUpdated}</span>
              </div>
              <span>Category: {categories.find(c => c.id === code.category)?.label}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => toggleCode(code.id)}
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-200"
          >
            <span>View Details</span>
            {expandedCodes[code.id] ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          <button className="flex items-center space-x-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 px-3 py-1 rounded text-xs transition-all duration-200">
            <Download className="w-3 h-3" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {expandedCodes[code.id] && (
        <div className="border-t border-gray-600/50 p-6">
          {/* User Type Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-1">
              <div className="flex space-x-1">
                <button
                  onClick={() => setUserType('employer')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    userType === 'employer'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <HardHat className="w-3 h-3 inline mr-1" />
                  Employer View
                </button>
                <button
                  onClick={() => setUserType('worker')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    userType === 'worker'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3 h-3 inline mr-1" />
                  Worker View
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Role-specific content */}
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h4 className="text-cyan-300 font-medium mb-3 flex items-center space-x-2">
                {userType === 'employer' ? (
                  <>
                    <HardHat className="w-4 h-4" />
                    <span>Employer Obligations</span>
                  </>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    <span>Worker Rights & Responsibilities</span>
                  </>
                )}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {userType === 'employer' ? code.employerContent : code.workerContent}
              </p>
            </div>

            {/* What this means callout (for workers) */}
            {userType === 'worker' && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-300 font-medium mb-2 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>What This Means For You</span>
                </h4>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {code.whatThisMeans}
                </p>
              </div>
            )}

            {/* Key Points */}
            <div>
              <h4 className="text-white font-medium mb-3">Key Requirements</h4>
              <ul className="space-y-2">
                {code.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-600/50">
              <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-200">
                <ExternalLink className="w-4 h-4" />
                <span>View Full Code</span>
              </button>
              <button className="flex items-center space-x-2 text-green-400 hover:text-green-300 text-sm transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Book className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Codes of Practice
                </h1>
                <p className="text-cyan-300 text-sm">Practical Guidance & Best Practices</p>
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
        
        {/* Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search codes by title or content..."
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="bg-gray-800">
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-800 border border-gray-600 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* AI Helper */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4">
            <p className="text-cyan-300 text-sm">
              <strong>Ask AI:</strong> "What's required for first aid in my workplace?" or "How do I develop an emergency plan?"
            </p>
          </div>
        </div>

        {/* Codes Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-6'}>
          {filteredCodes.map((code) => (
            <CodeCard key={code.id} code={code} />
          ))}
        </div>

        {filteredCodes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No codes found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filter</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-600/50">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-600/30 hover:border-cyan-500/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Legislation</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/30"
          >
            <span>Next: Incident Response</span>
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
                <strong className="text-cyan-300">AI Assistant:</strong> I can help you understand practical WHS guidance from the Codes of Practice. Ask about specific workplace safety requirements or best practices!
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-600/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about practical guidance..."
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

export default WHSCodesOfPracticeScreen;

