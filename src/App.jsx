import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [showScientific, setShowScientific] = useState(false);

  // Обработчик кнопок
  const handleButtonClick = (value) => {
    setInput((prevInput) => {
      if (/(\D|^)0$/.test(prevInput)) {
        return prevInput.slice(0, -1) + value; // Удаляем последний 0 и добавляем новую цифру
      }
      return prevInput + value;
    });
  };

  // Очищает все
  const handleClear = () => {
    setInput('');
  };

  // удаляет последнюю цифру
  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  // Вычисление результата
  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput('Error');
    }
  };

  // Обработка научных операций
  const handleScientificOperation = (operation) => {
    try {
      setInput((prevInput) => {
        const result = eval(`Math.${operation}(${prevInput})`);
        return result.toString();
      });
    } catch (error) {
      setInput('Error');
    }
  };

  // Обработка событий клавиатуры
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if (key >= '0' && key <= '9') {
        handleButtonClick(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleButtonClick(key);
      } else if (key === '(' || key === ')') {
        handleButtonClick(key);
      } else if (key === '.') {
        handleButtonClick('.');
      } else if (key === 'Enter') {
        event.preventDefault();
        handleCalculate();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [input]);

  return (
    <div className="calculator">
      <div className="display">{input || '0'}</div>

      <div className="buttons">
        <button className="btn special" onClick={handleClear}>AC</button>
        <button className="btn special" onClick={handleBackspace}>⌫</button>
        <button className="btn special" onClick={() => handleButtonClick('%')}>%</button>
        <button className="btn operator" onClick={() => handleButtonClick('/')}>÷</button>

        <button className="btn" onClick={() => handleButtonClick('7')}>7</button>
        <button className="btn" onClick={() => handleButtonClick('8')}>8</button>
        <button className="btn" onClick={() => handleButtonClick('9')}>9</button>
        <button className="btn operator" onClick={() => handleButtonClick('*')}>×</button>

        <button className="btn" onClick={() => handleButtonClick('4')}>4</button>
        <button className="btn" onClick={() => handleButtonClick('5')}>5</button>
        <button className="btn" onClick={() => handleButtonClick('6')}>6</button>
        <button className="btn operator" onClick={() => handleButtonClick('-')}>−</button>

        <button className="btn" onClick={() => handleButtonClick('1')}>1</button>
        <button className="btn" onClick={() => handleButtonClick('2')}>2</button>
        <button className="btn" onClick={() => handleButtonClick('3')}>3</button>
        <button className="btn operator" onClick={() => handleButtonClick('+')}>+</button>

        <button className="btn special" onClick={() => handleButtonClick('(')}>(</button>
        <button className="btn" onClick={() => handleButtonClick('0')}>0</button>
        <button className="btn special" onClick={() => handleButtonClick(')')}>)</button>
        <button className="btn equals" onClick={handleCalculate}>=</button>
      </div>

      <button
        className="btn toggle-scientific"
        onClick={() => setShowScientific((prev) => !prev)}
      >
        {showScientific ? 'Hide Scientific' : 'Scientific'}
      </button>

      {showScientific && (
        <div className="scientific-buttons">
          <button
            className="btn scientific"
            onClick={() => handleScientificOperation('sqrt')}
          >
            √
          </button>
          <button
            className="btn scientific"
            onClick={() => handleScientificOperation('sin')}
          >
            sin
          </button>
          <button
            className="btn scientific"
            onClick={() => handleScientificOperation('cos')}
          >
            cos
          </button>
          <button
            className="btn scientific"
            onClick={() => handleScientificOperation('tan')}
          >
            tan
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
