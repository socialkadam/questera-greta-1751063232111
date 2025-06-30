import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaCheckCircle, FaTimesCircle, FaGraduationCap } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { wizardQuizQuestions } from '../data/quizData';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

function WizardVettingQuiz({ onComplete }) {
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
    if (currentQuestion < wizardQuizQuestions.length - 1) {
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
    const maxPossibleScore = wizardQuizQuestions.length * 4;
    const percentage = Math.round((totalScore / maxPossibleScore) * 100);

    let status = 'rejected';
    let message = '';
    let nextStep = '';

    if (percentage >= 75) {
      status = 'approved';
      message = 'Congratulations! You\'ve passed the vetting quiz with flying colors.';
      nextStep = 'Your wizard profile will be approved and you can start helping seekers immediately.';
    } else if (percentage >= 60) {
      status = 'academy';
      message = 'You\'re on the right track! Your score qualifies you for Wizardoo Academy.';
      nextStep = 'Complete our academy modules to enhance your skills and qualify for certification.';
    } else {
      status = 'rejected';
      message = 'Your score indicates you may need more experience in your chosen archetype.';
      nextStep = 'You can retake this quiz after 30 days of additional preparation.';
    }

    return {
      scores,
      recommendedArchetype,
      totalScore,
      percentage,
      status,
      message,
      nextStep
    };
  };

  const completeQuiz = async () => {
    setLoading(true);
    
    try {
      const quizResult = calculateResult();
      
      // Save quiz attempt
      const { error: attemptError } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          quiz_type: 'wizard_vetting',
          score: quizResult.percentage,
          answers: answers,
          next_attempt_allowed_at: quizResult.status === 'rejected' 
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
            : null
        });

      if (attemptError) {
        console.error('Error saving quiz attempt:', attemptError);
      }

      // Update wizard profile based on result
      let updateData = {};
      
      if (quizResult.status === 'approved') {
        updateData = { status: 'approved' };
      } else if (quizResult.status === 'academy') {
        updateData = { academy_enrolled: true, status: 'pending' };
      } else {
        updateData = { status: 'rejected' };
      }

      const { error: updateError } = await supabase
        .from('wizards')
        .update(updateData)
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating wizard status:', updateError);
        throw updateError;
      }

      setResult(quizResult);
      setIsComplete(true);
      
      if (onComplete) {
        onComplete(quizResult);
      }
      
    } catch (error) {
      console.error('Error completing quiz:', error);
      alert('There was an error processing your quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentQuestionData = wizardQuizQuestions[currentQuestion];
  const currentAnswer = answers[currentQuestionData?.id];
  const progress = ((currentQuestion + 1) / wizardQuizQuestions.length) * 100;

  if (isComplete && result) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
            result.status === 'approved' ? 'bg-green-100' :
            result.status === 'academy' ? 'bg-yellow-100' :
            'bg-red-100'
          }`}>
            {result.status === 'approved' && <FaCheckCircle className="text-4xl text-green-600" />}
            {result.status === 'academy' && <FaGraduationCap className="text-4xl text-yellow-600" />}
            {result.status === 'rejected' && <FaTimesCircle className="text-4xl text-red-600" />}
          </div>
          
          <h1 className="kadam-heading text-4xl mb-4 text-kadam-deep-green">
            Quiz Complete!
          </h1>
          
          <div className="bg-white rounded-2xl p-8 shadow-soft mb-8">
            <div className="text-6xl font-bold text-kadam-deep-green mb-4">
              {result.percentage}%
            </div>
            <p className="text-xl text-gray-600 kadam-body-medium mb-4">
              {result.message}
            </p>
            <p className="text-gray-600 kadam-body">
              {result.nextStep}
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-6"
        >
          {result.status === 'approved' && (
            <button
              onClick={() => window.location.href = '/wizard-dashboard'}
              className="kadam-button text-lg px-8 py-4 inline-flex items-center"
            >
              <FaWandMagicSparkles className="mr-3" />
              Go to Wizard Dashboard
            </button>
          )}
          
          {result.status === 'academy' && (
            <button
              onClick={() => window.location.href = '/academy'}
              className="kadam-button text-lg px-8 py-4 inline-flex items-center"
            >
              <FaGraduationCap className="mr-3" />
              Enroll in Wizardoo Academy
            </button>
          )}
          
          {result.status === 'rejected' && (
            <div className="space-y-4">
              <p className="text-gray-600 kadam-body">
                You can retake this quiz after 30 days. Use this time to gain more experience in your chosen archetype.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="kadam-button-outline text-lg px-8 py-4"
              >
                Return to Home
              </button>
            </div>
          )}
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-soft mt-8"
        >
          <h3 className="kadam-subheading text-2xl mb-6 text-center text-kadam-deep-green">
            Your Archetype Breakdown
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
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="kadam-body-medium text-kadam-deep-green">
            Question {currentQuestion + 1} of {wizardQuizQuestions.length}
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
              Processing...
            </>
          ) : currentQuestion === wizardQuizQuestions.length - 1 ? (
            <>
              Complete Assessment
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

export default WizardVettingQuiz;