import { motion } from 'framer-motion';
import { tapsMatrix } from '../data/quizData';

function TAPSQuadrant({ selectedArchetype = null, onArchetypeSelect = null, className = "" }) {
  const quadrants = [
    { archetype: 'mentor', position: 'top-left' },
    { archetype: 'coach', position: 'top-right' },
    { archetype: 'counselor', position: 'bottom-left' },
    { archetype: 'consultant', position: 'bottom-right' }
  ];

  const getQuadrantClasses = (archetype) => {
    const baseClasses = "relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300";
    const isSelected = selectedArchetype === archetype;
    
    if (isSelected) {
      return `${baseClasses} border-kadam-gold bg-kadam-light-green shadow-large scale-105`;
    }
    
    return `${baseClasses} border-gray-200 hover:border-kadam-gold hover:bg-gray-50 hover:shadow-medium`;
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="kadam-heading text-3xl mb-4 text-kadam-deep-green">
          TAPS Archetype Matrix
        </h2>
        <p className="text-gray-600 kadam-body text-lg">
          Discover your guidance style across the Tell-Ask and Problem-Solution dimensions
        </p>
      </div>

      {/* Matrix */}
      <div className="relative">
        {/* Axis Labels */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <span className="text-kadam-deep-green font-semibold kadam-subheading">TELL</span>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <span className="text-kadam-deep-green font-semibold kadam-subheading">ASK</span>
        </div>
        <div className="absolute top-1/2 -left-16 transform -translate-y-1/2 -rotate-90">
          <span className="text-kadam-deep-green font-semibold kadam-subheading">PROBLEM</span>
        </div>
        <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 rotate-90">
          <span className="text-kadam-deep-green font-semibold kadam-subheading">SOLUTION</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 p-8">
          {quadrants.map(({ archetype, position }) => {
            const data = tapsMatrix[archetype];
            
            return (
              <motion.div
                key={archetype}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className={getQuadrantClasses(archetype)}
                onClick={() => onArchetypeSelect && onArchetypeSelect(archetype)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{data.icon}</div>
                  <h3 className="kadam-subheading text-xl mb-3 text-kadam-deep-green">
                    {data.name}
                  </h3>
                  <p className="text-gray-600 kadam-body text-sm mb-4">
                    {data.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {data.traits.map((trait, index) => (
                      <span
                        key={index}
                        className="bg-kadam-gold/20 text-kadam-deep-green px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedArchetype === archetype && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-kadam-gold rounded-full flex items-center justify-center"
                  >
                    <span className="text-kadam-deep-green text-sm font-bold">✓</span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-12 bg-kadam-light-green p-6 rounded-2xl">
        <h3 className="kadam-subheading text-lg mb-4 text-center text-kadam-deep-green">
          Understanding the TAPS Matrix
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm kadam-body">
          <div>
            <h4 className="font-semibold text-kadam-deep-green mb-2">Tell vs Ask</h4>
            <p className="text-gray-600">
              <strong>Tell:</strong> Directive approach, sharing knowledge and solutions<br/>
              <strong>Ask:</strong> Inquiry-based approach, using questions to guide discovery
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-kadam-deep-green mb-2">Problem vs Solution</h4>
            <p className="text-gray-600">
              <strong>Problem:</strong> Focus on understanding and exploring challenges<br/>
              <strong>Solution:</strong> Focus on implementing answers and outcomes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TAPSQuadrant;