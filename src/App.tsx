import { useState } from 'react';
import NameInput from './components/NameInput';
import QuestionScreen from './components/QuestionScreen';
import SuccessScreen from './components/SuccessScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'name' | 'question' | 'success'>('name');
  const [userName, setUserName] = useState('');

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setCurrentScreen('question');
  };

  const handleYesClick = () => {
    setCurrentScreen('success');
  };

  return (
    <div className="min-h-screen transition-colors duration-1000">
      {currentScreen === 'name' && <NameInput onSubmit={handleNameSubmit} />}
      {currentScreen === 'question' && <QuestionScreen userName={userName} onYesClick={handleYesClick} />}
      {currentScreen === 'success' && <SuccessScreen userName={userName} />}
    </div>
  );
}

export default App;
