import { useState, useEffect } from 'react';
import { FaWallet, FaHome, FaBolt, FaBus, FaUsers, FaCartPlus, FaTrash, FaCalendarAlt, FaCreditCard, FaRobot, FaBook, FaTags, FaMoneyBillWave, FaShoppingBasket, FaUtensils, FaClipboardList, FaTag, FaArrowLeft, FaGlobe } from 'react-icons/fa';
import './App.css';

function App() {
  // Настройки языка и валюты
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ru');
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || '₽');

  // Словари для перевода
  const t = {
    ru: {
      title: "Мой бюджет",
      chooseSection: "Выберите раздел:",
      budget: "Бюджет и расходы",
      products: "Список продуктов",
      menu: "Меню и рецепты",
      notes: "Блокнот",
      prices: "Мои цены на продукты",
      back: "На главную",
      income: "Доход",
      people: "Человек в семье",
      nextSalary: "Дата следующей зарплаты",
      mandatory: "Обязательные платежи",
      other: "Прочие расходы",
      calc: "Рассчитать бюджет",
      summary: "Ваша сводка:",
      remainder: "Остаток",
      perPerson: "В день на человека",
      daysLeft: "Дней до зарплаты",
      diet: "Тип питания",
      common: "Обычное",
      pp: "ПП",
      halal: "Халяль",
      diabetes: "Диабет",
      lowcal: "Низкокалорийное",
      addDish: "Добавить блюдо",
      genMenu: "Сгенерировать меню и продукты",
      noteText: "Что нужно сделать?",
      addNote: "Добавить заметку",
      basePrices: "Мои цены на продукты",
      totalBasket: "Итого базовая корзина",
      add: "Добавить",
      name: "Название",
      price: "Цена",
    },
    en: {
      title: "My Budget",
      chooseSection: "Choose a section:",
      budget: "Budget & Expenses",
      products: "Products List",
      menu: "Menu & Recipes",
      notes: "Notepad",
      prices: "My Product Prices",
      back: "Back to Home",
      income: "Income",
      people: "Family members",
      nextSalary: "Next salary date",
      mandatory: "Mandatory Payments",
      other: "Other Expenses",
      calc: "Calculate Budget",
      summary: "Your Summary:",
      remainder: "Remainder",
      perPerson: "Per person per day",
      daysLeft: "Days until salary",
      diet: "Diet type",
      common: "Regular",
      pp: "Healthy",
      halal: "Halal",
      diabetes: "Diabetes",
      lowcal: "Low-calorie",
      addDish: "Add dish",
      genMenu: "Generate menu & products",
      noteText: "What to do?",
      addNote: "Add note",
      basePrices: "My Product Prices",
      totalBasket: "Total base basket",
      add: "Add",
      name: "Name",
      price: "Price",
    }
  };

  const text = t[lang];
  const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  const [activeTab, setActiveTab] = useState('home');
  const [showMandatory, setShowMandatory] = useState(true);
  const [showOther, setShowOther] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Бюджет
  const [income, setIncome] = useState(() => localStorage.getItem('income') || 0);
  const [people, setPeople] = useState(() => localStorage.getItem('people') || 1);
  const [nextSalaryDate, setNextSalaryDate] = useState(() => localStorage.getItem('nextSalaryDate') || '');
 
  // Платежи
  const [mortgage, setMortgage] = useState(() => localStorage.getItem('mortgage') || 0);
  const [utilities, setUtilities] = useState(() => localStorage.getItem('utilities') || 0);
  const [credit, setCredit] = useState(() => localStorage.getItem('credit') || 0);
  const [transport, setTransport] = useState(() => localStorage.getItem('transport') || 0);

  const [customMandatory, setCustomMandatory] = useState(() => {
    const saved = localStorage.getItem('customMandatory');
    return saved ? JSON.parse(saved) : [];
  });
  const [mandatoryName, setMandatoryName] = useState('');
  const [mandatoryAmount, setMandatoryAmount] = useState('');

  const [other, setOther] = useState(() => {
    const saved = localStorage.getItem('other');
    return saved ? JSON.parse(saved) : [];
  });
  const [otherName, setOtherName] = useState('');
  const [otherAmount, setOtherAmount] = useState('');

  const [mandatoryColor, setMandatoryColor] = useState(() => localStorage.getItem('mandatoryColor') || '#ff7675');
  const [otherColor, setOtherColor] = useState(() => localStorage.getItem('otherColor') || '#fdcb6e');

  // Корзина
  const [basePrices, setBasePrices] = useState(() => {
    const saved = localStorage.getItem('basePrices');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Молоко (1 л)', price: 80 },
      { id: 2, name: 'Хлеб (1 шт)', price: 50 },
      { id: 3, name: 'Яйца (10 шт)', price: 120 },
      { id: 4, name: 'Курица (1 кг)', price: 350 },
      { id: 5, name: 'Гречка (1 кг)', price: 100 }
    ];
  });

  const [result, setResult] = useState(null);
 
  // Продукты
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  // Меню
  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem('menu');
    return saved ? JSON.parse(saved) : [];
  });
  const [dishName, setDishName] = useState('');
  const [dishDay, setDishDay] = useState('Понедельник');
  const [dietType, setDietType] = useState(() => localStorage.getItem('dietType') || 'common');

  // Блокнот
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [noteText, setNoteText] = useState('');
  const [noteDate, setNoteDate] = useState('');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('currency', currency);
    localStorage.setItem('income', income);
    localStorage.setItem('people', people);
    localStorage.setItem('nextSalaryDate', nextSalaryDate);
    localStorage.setItem('mortgage', mortgage);
    localStorage.setItem('utilities', utilities);
    localStorage.setItem('credit', credit);
    localStorage.setItem('transport', transport);
    localStorage.setItem('customMandatory', JSON.stringify(customMandatory));
    localStorage.setItem('other', JSON.stringify(other));
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('menu', JSON.stringify(menu));
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('dietType', dietType);
    localStorage.setItem('mandatoryColor', mandatoryColor);
    localStorage.setItem('otherColor', otherColor);
    localStorage.setItem('basePrices', JSON.stringify(basePrices));
  }, [lang, currency, income, people, nextSalaryDate, mortgage, utilities, credit, transport, customMandatory, other, products, menu, notes, dietType, mandatoryColor, otherColor, basePrices]);

  const calculate = () => {
    const totalProducts = products.reduce((sum, p) => sum + Number(p.price), 0);
    const totalFixed = Number(mortgage) + Number(utilities) + Number(credit) + Number(transport);
    const totalCustom = customMandatory.reduce((sum, p) => sum + Number(p.amount), 0);
    const totalOther = other.reduce((sum, p) => sum + Number(p.amount), 0);
    const totalMandatory = totalFixed + totalCustom;
    const totalBaseBasket = basePrices.reduce((sum, p) => sum + Number(p.price), 0);

    const remainder = Number(income) - totalMandatory - totalOther;
    const foodBudget = remainder - totalProducts;
   
    let daysLeft = 30;
    if (nextSalaryDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const salaryDate = new Date(nextSalaryDate);
      const diffTime = salaryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) daysLeft = diffDays;
    }

    const perDay = remainder / daysLeft;
    const perPerson = perDay / (Number(people) || 1);
   
    setResult({
      remainder: remainder,
      perDay: perDay.toFixed(0),
      perPerson: perPerson.toFixed(0),
      totalProducts: totalProducts,
      foodBudget: foodBudget,
      totalMandatory: totalMandatory,
      totalOther: totalOther,
      totalBaseBasket: totalBaseBasket,
      daysLeft: daysLeft
    });
  };

  const addItem = (name, amount, list, setList, setName, setAmount) => {
    if (!name || !amount) return;
    setList([...list, { id: Date.now(), name, amount: Number(amount) }]);
    setName('');
    setAmount('');
  };

  const removeItem = (id, list, setList) => {
    setList(list.filter(item => item.id !== id));
  };

  const addProduct = () => {
    if (!productName || !productPrice) return;
    setProducts([...products, { id: Date.now(), name: productName, price: Number(productPrice) }]);
    setProductName('');
    setProductPrice('');
  };

  const addDish = () => {
    if (!dishName) return;
    setMenu([...menu, { id: Date.now(), name: dishName, day: dishDay }]);
    setDishName('');
  };

  const addNote = () => {
    if (!noteText) return;
    const newNote = { id: Date.now(), text: noteText, date: noteDate };
    const sortedNotes = [...notes, newNote].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });
    setNotes(sortedNotes);
    setNoteText('');
    setNoteDate('');
  };

  const getDaysLeft = (dateString) => {
    if (!dateString) return '';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateString);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   
    if (diffDays === 0) return lang === 'ru' ? 'Сегодня!' : 'Today!';
    if (diffDays === 1) return lang === 'ru' ? 'Завтра!' : 'Tomorrow!';
    if (diffDays < 0) return lang === 'ru' ? 'Просрочено' : 'Overdue';
    return lang === 'ru' ? `Через ${diffDays} дн.` : `In ${diffDays} days`;
  };

  const generateMenuAndProducts = () => {
    if (!result) {
      alert(lang === 'ru' ? "Сначала рассчитайте бюджет!" : "Calculate budget first!");
      return;
    }
    if (result.foodBudget <= 0) {
      alert(lang === 'ru' ? "У вас нет свободных средств на продукты." : "No free funds for products.");
      return;
    }

    const demoProducts = [
      { id: Date.now() + 1, name: `Курица`, price: basePrices[3].price },
      { id: Date.now() + 2, name: `Овощи`, price: 150 },
      { id: Date.now() + 3, name: `Крупа`, price: basePrices[4].price }
    ];
   
    setProducts([...products, ...demoProducts]);
    alert(lang === 'ru' ? `Продукты добавлены!` : `Products added!`);
  };

  const BackButton = () => (
    <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', color: '#a29bfe', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', marginBottom: '15px', width: 'auto' }}>
      <FaArrowLeft /> {text.back}
    </button>
  );

  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>{text.title}</h1>
        <button onClick={() => setShowSettings(!showSettings)} style={{ background: 'rgba(255,255,255,0.1)', width: 'auto', padding: '8px 12px' }}>
          <FaGlobe size={20} color="#74b9ff" />
        </button>
      </div>

      {showSettings && (
        <div style={{ background: 'rgba(0,0,0,0.6)', padding: '15px', borderRadius: '10px', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label>Язык / Language:</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ width: '100%', marginTop: '5px' }}>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label>Валюта / Currency:</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ width: '100%', marginTop: '5px' }}>
              <option value="₽">Рубль (₽)</option>
              <option value="сум">Сум (сум)</option>
              <option value="тг">Тенге (тг)</option>
              <option value="$">Доллар ($)</option>
              <option value="€">Евро (€)</option>
            </select>
          </div>
        </div>
      )}

      {activeTab === 'home' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
         
          {result && (
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #a29bfe' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#a29bfe' }}>{text.summary}</h3>
              <p style={{ margin: '5px 0', fontSize: '15px' }}>{text.remainder}: <b style={{ color: '#00b894' }}>{result.remainder} {currency}</b></p>
              <p style={{ margin: '5px 0', fontSize: '15px' }}>{text.perPerson}: <b>{result.perPerson} {currency}</b></p>
              <p style={{ margin: '5px 0', fontSize: '15px' }}>{text.daysLeft}: <b style={{ color: '#ff7675' }}>{result.daysLeft}</b></p>
            </div>
          )}

          <p style={{ textAlign: 'center', color: '#ddd', marginBottom: '10px', fontSize: '16px' }}>{text.chooseSection}</p>
         
          <button onClick={() => setActiveTab('budget')} style={{ background: 'rgba(0, 184, 148, 0.2)', border: '1px solid #00b894', display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', fontSize: '18px', borderRadius: '15px' }}>
            <img src="/budget.png" alt="Budget" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px' }} />
            {text.budget}
          </button>
         
          <button onClick={() => setActiveTab('products')} style={{ background: 'rgba(225, 112, 85, 0.2)', border: '1px solid #e17055', display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', fontSize: '18px', borderRadius: '15px' }}>
            <img src="/products.png" alt="Products" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px' }} />
            {text.products}
          </button>
         
          <button onClick={() => setActiveTab('menu')} style={{ background: 'rgba(253, 203, 110, 0.2)', border: '1px solid #fdcb6e', display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', fontSize: '18px', borderRadius: '15px' }}>
            <img src="/menu.png" alt="Menu" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px' }} />
            {text.menu}
          </button>
         
          <button onClick={() => setActiveTab('notes')} style={{ background: 'rgba(116, 185, 255, 0.2)', border: '1px solid #74b9ff', display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', fontSize: '18px', borderRadius: '15px' }}>
            <img src="/notes.png" alt="Notes" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px' }} />
            {text.notes}
          </button>
         
          <button onClick={() => setActiveTab('prices')} style={{ background: 'rgba(253, 121, 168, 0.2)', border: '1px solid #fd79a8', display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', fontSize: '18px', borderRadius: '15px' }}>
            <img src="/prices.png" alt="Prices" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px' }} />
            {text.prices}
          </button>
        </div>
      )}

      {activeTab === 'budget' && (
        <div>
          <BackButton />
          <div style={{ background: 'rgba(0, 184, 148, 0.4)', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
            <label><FaWallet /> {text.income} ({currency}):</label>
            <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} style={{ fontSize: '18px', marginBottom: '10px' }} />
           
            <label><FaUsers /> {text.people}:</label>
            <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} style={{ marginBottom: '10px' }} />

            <label><FaCalendarAlt /> {text.nextSalary}:</label>
            <input type="date" value={nextSalaryDate} onChange={(e) => setNextSalaryDate(e.target.value)} />
          </div>
         
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <button onClick={() => setShowMandatory(!showMandatory)} style={{ background: mandatoryColor, flex: 1, display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
              <span>🔴 {text.mandatory}</span> <span>{showMandatory ? '▲' : '▼'}</span>
            </button>
            <div style={{ position: 'relative', width: '40px', height: '40px', cursor: 'pointer' }}>
              <input type="color" value={mandatoryColor} onChange={(e) => setMandatoryColor(e.target.value)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
              <div style={{ width: '100%', height: '100%', background: mandatoryColor, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid rgba(255,255,255,0.3)' }}><span>🎨</span></div>
            </div>
          </div>
         
          {showMandatory && (
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
              <div className="input-group"><label><FaHome /> Ипотека ({currency}):</label><input type="number" value={mortgage} onChange={(e) => setMortgage(e.target.value)} /></div>
              <div className="input-group"><label><FaBolt /> Коммуналка ({currency}):</label><input type="number" value={utilities} onChange={(e) => setUtilities(e.target.value)} /></div>
              <div className="input-group"><label><FaCreditCard /> Кредиты ({currency}):</label><input type="number" value={credit} onChange={(e) => setCredit(e.target.value)} /></div>
              <div className="input-group"><label><FaBus /> Проезд ({currency}):</label><input type="number" value={transport} onChange={(e) => setTransport(e.target.value)} /></div>
              <hr style={{ margin: '15px 0', border: `1px dashed ${mandatoryColor}` }} />
              <label style={{ color: mandatoryColor, fontSize: '14px' }}>{text.add}:</label>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <input type="text" placeholder={text.name} value={mandatoryName} onChange={(e) => setMandatoryName(e.target.value)} style={{ flex: 2 }} />
                <input type="number" placeholder={text.price} value={mandatoryAmount} onChange={(e) => setMandatoryAmount(e.target.value)} style={{ flex: 1 }} />
              </div>
              <button onClick={() => addItem(mandatoryName, mandatoryAmount, customMandatory, setCustomMandatory, setMandatoryName, setMandatoryAmount)} style={{ background: mandatoryColor, marginTop: '10px', padding: '10px' }}>{text.add}</button>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
                {customMandatory.map(item => (
                  <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.1)', padding: '8px', marginBottom: '5px', borderRadius: '5px' }}>
                    <span>{item.name} — {item.amount} {currency}</span>
                    <button onClick={() => removeItem(item.id, customMandatory, setCustomMandatory)} className="delete-btn"><FaTrash /></button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <button onClick={() => setShowOther(!showOther)} style={{ background: otherColor, color: '#333', flex: 1, display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
              <span>🟡 {text.other}</span> <span>{showOther ? '▲' : '▼'}</span>
            </button>
            <div style={{ position: 'relative', width: '40px', height: '40px', cursor: 'pointer' }}>
              <input type="color" value={otherColor} onChange={(e) => setOtherColor(e.target.value)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
              <div style={{ width: '100%', height: '100%', background: otherColor, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid rgba(255,255,255,0.3)' }}><span>🎨</span></div>
            </div>
          </div>

          {showOther && (
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder={text.name} value={otherName} onChange={(e) => setOtherName(e.target.value)} style={{ flex: 2 }} />
                <input type="number" placeholder={text.price} value={otherAmount} onChange={(e) => setOtherAmount(e.target.value)} style={{ flex: 1 }} />
              </div>
              <button onClick={() => addItem(otherName, otherAmount, other, setOther, setOtherName, setOtherAmount)} style={{ background: otherColor, color: '#333', marginTop: '10px', padding: '10px' }}>{text.add}</button>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
                {other.map(item => (
                  <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.1)', padding: '8px', marginBottom: '5px', borderRadius: '5px' }}>
                    <span>{item.name} — {item.amount} {currency}</span>
                    <button onClick={() => removeItem(item.id, other, setOther)} className="delete-btn"><FaTrash /></button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={calculate} style={{ background: '#a29bfe', marginTop: '10px', padding: '15px', fontSize: '16px', fontWeight: 'bold' }}>{text.calc}</button>

          {result && (
            <div className="result-box" style={{ marginTop: '20px' }}>
              <h3>{text.summary}</h3>
              <p style={{ fontSize: '16px', marginBottom: '10px' }}>{text.daysLeft}: <b style={{ color: '#ff7675' }}>{result.daysLeft}</b></p>
              <p style={{ fontSize: '18px', marginBottom: '10px' }}>{text.remainder}: <b style={{ color: '#00b894' }}>{result.remainder} {currency}</b></p>
              <p style={{ fontSize: '16px', marginBottom: '10px' }}>{text.products}: <b>{result.foodBudget} {currency}</b></p>
              <p style={{ fontSize: '16px' }}>{text.perPerson}: <b style={{ color: '#a29bfe' }}>{result.perPerson} {currency}</b></p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <BackButton />
          <h2>{text.products}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder={text.name} value={productName} onChange={(e) => setProductName(e.target.value)} />
            <input type="number" placeholder={text.price} value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          </div>
          <button onClick={addProduct} style={{ marginTop: '10px' }}><FaCartPlus /> {text.add}</button>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
            {products.map(p => (
              <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.9)', padding: '10px', marginBottom: '5px', borderRadius: '5px', color: '#333' }}>
                <span>{p.name} — {p.price} {currency}</span>
                <button onClick={() => removeItem(p.id, products, setProducts)} className="delete-btn"><FaTrash /></button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'menu' && (
        <div>
          <BackButton />
          <h2><FaCalendarAlt /> {text.menu}</h2>
          <div style={{ marginBottom: '15px', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '8px' }}>
            <label>{text.diet}:</label>
            <select value={dietType} onChange={(e) => setDietType(e.target.value)} style={{ width: '100%', marginTop: '5px' }}>
              <option value="common">{text.common}</option>
              <option value="pp">{text.pp}</option>
              <option value="halal">{text.halal}</option>
              <option value="diabetes">{text.diabetes}</option>
              <option value="lowcal">{text.lowcal}</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="Блюдо" value={dishName} onChange={(e) => setDishName(e.target.value)} />
            <select value={dishDay} onChange={(e) => setDishDay(e.target.value)}>
              {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
            </select>
          </div>
          <button onClick={addDish} style={{ marginTop: '10px' }}>{text.addDish}</button>

          <div style={{ marginTop: '20px' }}>
            {daysOfWeek.map(day => {
              const dayDishes = menu.filter(d => d.day === day);
              if (dayDishes.length === 0) return null;
              return (
                <div key={day} style={{ marginBottom: '10px', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px' }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#a29bfe' }}>{day}</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {dayDishes.map(dish => (
                      <li key={dish.id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.9)', padding: '8px', marginBottom: '5px', borderRadius: '5px', color: '#333' }}>
                        <span>{dish.name}</span>
                        <button onClick={() => removeItem(dish.id, menu, setMenu)} className="delete-btn"><FaTrash /></button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(162, 155, 254, 0.2)', borderRadius: '10px' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}><b>Умный помощник / Smart assistant</b></p>
            {!result ? (
              <p style={{ color: '#ff7675', fontSize: '14px' }}>⚠️ Сначала рассчитайте бюджет.</p>
            ) : (
              <div>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>Ваш бюджет на продукты: <b>{result.foodBudget} {currency}</b></p>
                <button onClick={generateMenuAndProducts} style={{ background: '#00b894', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><FaRobot /> {text.genMenu}</button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div>
          <BackButton />
          <h2><FaBook /> {text.notes}</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
            <input type="text" placeholder={text.noteText} value={noteText} onChange={(e) => setNoteText(e.target.value)} style={{ flex: '2 1 200px' }} />
            <input type="date" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} style={{ flex: '1 1 150px' }} />
          </div>
          <button onClick={addNote} style={{ marginTop: '0px', background: '#74b9ff', color: 'white' }}>{text.addNote}</button>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
            {notes.map(note => (
              <li key={note.id} style={{ display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.9)', padding: '12px', marginBottom: '10px', borderRadius: '8px', color: '#333' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '16px' }}>{note.text}</strong>
                  <button onClick={() => removeItem(note.id, notes, setNotes)} className="delete-btn"><FaTrash /></button>
                </div>
                {note.date && (
                  <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                    📅 {note.date} — <span style={{ color: getDaysLeft(note.date) === (lang === 'ru' ? 'Сегодня!' : 'Today!') || getDaysLeft(note.date) === (lang === 'ru' ? 'Завтра!' : 'Tomorrow!') ? '#ff7675' : '#2c3e50', fontWeight: 'bold' }}>{getDaysLeft(note.date)}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'prices' && (
        <div>
          <BackButton />
          <h2><FaTags /> {text.basePrices}</h2>
          <p style={{ fontSize: '14px', color: '#ddd', marginBottom: '15px' }}>Введите реальные цены. / Enter real prices.</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {basePrices.map((item, index) => (
              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}>
                <span style={{ flex: 1 }}>{item.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input type="number" value={item.price} onChange={(e) => { const newPrices = [...basePrices]; newPrices[index].price = Number(e.target.value); setBasePrices(newPrices); }} style={{ width: '80px', padding: '5px', textAlign: 'center', background: 'rgba(255,255,255,0.9)', color: '#333', border: 'none', borderRadius: '5px' }} />
                  <span>{currency}</span>
                </div>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '20px' }}>{text.totalBasket}: {basePrices.reduce((sum, p) => sum + Number(p.price), 0)} {currency}</p>
        </div>
      )}

    </div>
  );
}

export default App;