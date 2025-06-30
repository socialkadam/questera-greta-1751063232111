import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { seekerQuizQuestions } from '../data/quizData';
import { useAuth } from '../context/AuthContext';
import TAPSQuadrant from './TAPSQuadrant';

function SeekerQuiz({ onComplete }) {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < seekerQuizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResult = () => {
    const scores = {
      coach: 0,
      mentor: 0,
      counselor: 0,
      consultant: 0
    };

    // Calculate archetype scores
    Object.values(answers).forEach(answer => {
      scores[answer.archetype] += answer.points;
    });

    const recommendedArchetype = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );

    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

    return {
      scores,
      recommendedArchetype,
      totalScore
    };
  };

  const completeQuiz = async () => {
    setLoading(true);
    
    try {
      const quizResult = calculateResult();
      
      setResult(quizResult);
      setIsComplete(true);

      // Call parent completion handler
      if (onComplete) {
        onComplete(quizResult);
      }
    } catch (error) {
      console.error('Error completing quiz:', error);
      alert('There was an error saving your quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentQuestionData = seekerQuizQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestionData?.id];
  const progress = ((currentQuestion + 1) / seekerQuizQuestions.length) * 100;

  if (isComplete && result) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-kadam-gold rounded-full mb-6">
            <FaCheckCircle className="text-4xl text-kadam-deep-green" />
          </div>
          <h1 className="kadam-heading text-4xl mb-4 text-kadam-deep-green">
            Quiz Complete!
          </h1>
          <p className="text-xl text-gray-600 kadam-body-medium">
            Based on your answers, we recommend connecting with a{' '}
            <span className="text-kadam-deep-green font-bold capitalize">
              {result.recommendedArchetype}
            </span>
          </p>
        </motion.div>

        {/* TAPS Quadrant with result highlighted */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <TAPSQuadrant selectedArchetype={result.recommendedArchetype} />
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-soft mb-8"
        >
          <h3 className="kadam-subheading text-2xl mb-6 text-center text-kadam-deep-green">
            Your Archetype Scores
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(result.scores).map(([archetype, score]) => {
              const isRecommended = archetype === result.recommendedArchetype;
              return (
                <div
                  key={archetype}
                  className={`text-center p-4 rounded-xl border-2 ${
                    isRecommended
                      ? 'border-kadam-gold bg-kadam-light-green'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-2xl font-bold text-kadam-deep-green mb-2">
                    {score}
                  </div>
                  <div className="capitalize font-medium text-gray-700">
                    {archetype}
                  </div>
                  {isRecommended && (
                    <div className="mt-2">
                      <FaWandMagicSparkles className="text-kadam-gold mx-auto" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <button
            onClick={() => window.location.href = `/wizards?type=${result.recommendedArchetype}&recommended=true`}
            className="kadam-button text-lg px-8 py-4 inline-flex items-center"
          >
            Find Your {result.recommendedArchetype.charAt(0).toUpperCase() + result.recommendedArchetype.slice(1)}
            <FaArrowRight className="ml-3" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="kadam-body-medium text-kadam-deep-green">
            Question {currentQuestion + 1} of {seekerQuizQuestions.length}
          </span>
          <span className="kadam-body text-gray-500">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-kadam-gold h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-soft mb-8"
        >
          <h2 className="kadam-heading text-2xl mb-8 text-center text-kadam-deep-green">
            {currentQuestionData.question}
          </h2>

          <div className="space-y-4">
            {currentQuestionData.answers.map((answer, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswer(currentQuestionData.id, answer)}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-300 ${
                  currentAnswer === answer
                    ? 'border-kadam-gold bg-kadam-light-green shadow-medium'
                    : 'border-gray-200 hover:border-kadam-gold hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="kadam-body text-lg">{answer.text}</span>
                  {currentAnswer === answer && (
                    <FaCheckCircle className="text-kadam-gold text-xl" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="kadam-button-outline disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Previous
        </button>

        <button
          onClick={nextQuestion}
          disabled={!currentAnswer || loading}
          className="kadam-button disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : currentQuestion === seekerQuizQuestions.length - 1 ? (
            <>
              Complete Quiz
              <FaWandMagicSparkles className="ml-2" />
            </>
          ) : (
            <>
              Next
              <FaArrowRight className="ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default SeekerQuiz;