import React, { useState, useEffect } from 'react';
import { Shield, Search, Filter, Book, Scale, ChevronDown, ChevronUp, ExternalLink, MessageCircle, X, Send, ArrowLeft, ChevronRight, AlertTriangle, Users, HardHat, FileText, Gavel } from 'lucide-react';

const WHSActRegulationsScreen = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [activeTab, setActiveTab] = useState('act'); // 'act' or 'regulations'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedSections, setExpandedSections] = useState({});
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

  const filters = [
    { id: 'all', label: 'All Topics' },
    { id: 'duty-of-care', label: 'Duty of Care' },
    { id: 'notifiable-incidents', label: 'Notifiable Incidents' },
    { id: 'high-risk-work', label: 'High Risk Work' },
    { id: 'consultation', label: 'Consultation' },
    { id: 'penalties', label: 'Penalties & Enforcement' }
  ];

  const actSections = [
    {
      id: 'part-2',
      title: 'Part 2 - Primary Duty of Care',
      section: 'Section 19',
      summary: 'The fundamental duty of a person conducting a business or undertaking (PCBU) to ensure health and safety',
      content: 'A person conducting a business or undertaking must ensure, so far as is reasonably practicable, the health and safety of workers engaged by the person, and workers whose activities in carrying out work are influenced or directed by the person.',
      category: 'duty-of-care',
      urgency: 'high'
    },
    {
      id: 'part-3',
      title: 'Part 3 - Health and Safety Duties',
      section: 'Sections 20-29',
      summary: 'Specific duties of PCBUs including provision of safe work environments, training, and consultation',
      content: 'PCBUs must provide and maintain safe work environments, adequate facilities, safe systems of work, information, training, instruction and supervision, and must consult with workers on health and safety matters.',
      category: 'duty-of-care',
      urgency: 'high'
    },
    {
      id: 'part-5',
      title: 'Part 5 - Consultation, Representation and Participation',
      section: 'Sections 47-85',
      summary: 'Requirements for consulting with workers and their representatives on WHS matters',
      content: 'PCBUs must consult with workers when identifying hazards and assessing risks, making decisions about ways to eliminate or minimise risks, and when proposing changes that may affect health and safety.',
      category: 'consultation',
      urgency: 'medium'
    },
    {
      id: 'part-7',
      title: 'Part 7 - Incident Notification',
      section: 'Sections 35-39',
      summary: 'Obligations to notify regulators of serious workplace incidents and preserve incident sites',
      content: 'A person must immediately notify the regulator of notifiable incidents including deaths, serious injuries, and dangerous incidents. The incident site must be preserved until an inspector arrives.',
      category: 'notifiable-incidents',
      urgency: 'critical'
    }
  ];

  const regulationsSections = [
    {
      id: 'reg-7',
      title: 'Part 7.1 - Managing Risks to Health and Safety',
      section: 'Regulations 34-38',
      summary: 'Risk management process including identification, assessment, control and review',
      content: 'PCBUs must identify hazards, assess risks, implement control measures following the hierarchy of controls, and regularly review and update risk controls.',
      category: 'duty-of-care',
      urgency: 'high'
    },
    {
      id: 'reg-4',
      title: 'Part 4.1 - High Risk Construction Work',
      section: 'Regulations 289-307',
      summary: 'Requirements for high risk construction activities including licensing and safety measures',
      content: 'High risk construction work requires licensed operators, safe work method statements, and specific safety measures for activities like working at height, demolition, and excavation.',
      category: 'high-risk-work',
      urgency: 'high'
    },
    {
      id: 'reg-3',
      title: 'Part 3.1 - Incident Notification',
      section: 'Regulations 175-178',
      summary: 'Details on what constitutes notifiable incidents and notification procedures',
      content: 'Notifiable incidents include death, serious injury requiring immediate treatment, dangerous incidents that expose persons to serious risk, and specific listed incidents.',
      category: 'notifiable-incidents',
      urgency: 'critical'
    },
    {
      id: 'reg-8',
      title: 'Part 8.1 - Penalties and Infringement Notices',
      section: 'Regulations 500-520',
      summary: 'Civil penalties and infringement notice amounts for various WHS breaches',
      content: 'Penalties range from infringement notices for minor breaches to substantial civil penalties for serious contraventions of WHS duties.',
      category: 'penalties',
      urgency: 'medium'
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const filteredSections = (sections) => {
    return sections.filter(section => {
      const matchesFilter = selectedFilter === 'all' || section.category === selectedFilter;
      const matchesSearch = searchTerm === '' || 
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.section.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-amber-500 bg-amber-500/10';
      case 'medium': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'high': return <HardHat className="w-4 h-4 text-amber-400" />;
      case 'medium': return <Users className="w-4 h-4 text-blue-400" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
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
      alert('Returning to Overview...');
      setIsTransitioning(false);
    }, 500);
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      alert('Transitioning to Codes of Practice...');
      setIsTransitioning(false);
    }, 500);
  };

  const currentSections = activeTab === 'act' ? actSections : regulationsSections;
  const displaySections = filteredSections(currentSections);

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
                <Gavel className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  WHS Act & Regulations
                </h1>
                <p className="text-cyan-300 text-sm">Legislative Reference & Compliance Lookup</p>
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
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg p-1">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('act')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'act'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Scale className="w-4 h-4 inline mr-2" />
                WHS Act
              </button>
              <button
                onClick={() => setActiveTab('regulations')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'regulations'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Book className="w-4 h-4 inline mr-2" />
                Regulations
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by section, title, or content..."
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                />
              </div>
            </div>
            
            {/* Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 appearance-none"
                >
                  {filters.map(filter => (
                    <option key={filter.id} value={filter.id} className="bg-gray-800">
                      {filter.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* AI Prompt Helper */}
          <div className="mt-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4">
            <p className="text-cyan-300 text-sm">
              <strong>Ask AI:</strong> "What are my duties regarding machinery safety?" or "What constitutes a notifiable incident?"
            </p>
          </div>
        </div>

        {/* Sections List */}
        <div className="space-y-4">
          {displaySections.map((section) => (
            <div
              key={section.id}
              className={`bg-gray-800/50 backdrop-blur-sm border rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 ${getUrgencyColor(section.urgency)}`}
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getUrgencyIcon(section.urgency)}
                      <h3 className="text-lg font-semibold text-white">
                        {section.title}
                      </h3>
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {section.section}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {section.summary}
                    </p>
                  </div>
                  <div className="ml-4">
                    {expandedSections[section.id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {expandedSections[section.id] && (
                <div className="px-6 pb-6 border-t border-gray-600/50">
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-cyan-300 font-medium mb-2">Full Text:</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>Category: {filters.find(f => f.id === section.category)?.label}</span>
                        <span>Priority: {section.urgency.charAt(0).toUpperCase() + section.urgency.slice(1)}</span>
                      </div>
                      <button className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors duration-200">
                        <span>View Full Section</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {displaySections.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No sections found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-600/50">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-6 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-600/30 hover:border-cyan-500/50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/30"
          >
            <span>Next: Codes of Practice</span>
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
                <strong className="text-cyan-300">AI Assistant:</strong> I can help you understand specific WHS Act sections and Regulations. Try asking "What are the PCBU duties?" or "When must I notify the regulator?"
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-600/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask about WHS legislation..."
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

export default WHSActRegulationsScreen;

