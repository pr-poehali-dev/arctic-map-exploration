import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const explorers = [
  {
    id: 1,
    name: 'Витус Беринг',
    years: '1681-1741',
    expedition: 'Первая Камчатская экспедиция',
    period: '1725-1730',
    yearStart: 1725,
    yearEnd: 1730,
    ship: 'Святой Гавриил',
    description: 'Датский мореплаватель на русской службе. Открыл пролив между Азией и Америкой, доказал, что они не соединены. Командующий двумя Камчатскими экспедициями.',
    fullBio: 'Витус Ионассен Беринг родился в Дании, но большую часть жизни посвятил службе в русском флоте. Пётр I лично поручил ему грандиозную задачу — выяснить, соединяется ли Азия с Америкой. Первая Камчатская экспедиция 1725-1730 годов прошла через всю Сибирь и достигла Тихого океана. Беринг построил корабль и исследовал побережье, доказав существование пролива между континентами.',
    achievements: [
      'Открытие пролива Беринга (1728)',
      'Картографирование восточного побережья Камчатки',
      'Первая экспедиция к берегам Аляски',
      'Открытие Командорских островов'
    ],
    route: [
      { x: 28, y: 48, label: 'Санкт-Петербург' },
      { x: 50, y: 42, label: 'Якутск' },
      { x: 68, y: 38, label: 'Петропавловск' },
      { x: 85, y: 32, label: 'Пролив Беринга' }
    ],
    image: 'https://cdn.poehali.dev/projects/8853b4ba-f903-42f5-8f29-b098ca8a57a3/files/e413eddf-46b5-4241-b9af-efe3cb79d744.jpg'
  },
  {
    id: 2,
    name: 'Семён Дежнёв',
    years: '1605-1673',
    expedition: 'Плавание из Колымы в Анадырь',
    period: '1648',
    yearStart: 1648,
    yearEnd: 1648,
    ship: 'Коч',
    description: 'Первым из европейцев прошёл Берингов пролив за 80 лет до Беринга, открыв крайнюю восточную точку Азии. Казак-землепроходец и мореход.',
    fullBio: 'Семён Иванович Дежнёв — выдающийся русский землепроходец и мореход. В 1648 году он совершил беспрецедентное плавание вокруг Чукотского полуострова на небольших судах-кочах. Экспедиция доказала, что между Азией и Америкой существует пролив. Однако отчёты Дежнёва были утеряны в архивах, и его открытие стало широко известно лишь спустя столетие.',
    achievements: [
      'Первое прохождение Берингова пролива (1648)',
      'Открытие мыса Дежнёва — крайней восточной точки Азии',
      'Основание Анадырского острога',
      'Исследование Чукотки и Колымы'
    ],
    route: [
      { x: 58, y: 42, label: 'Колыма' },
      { x: 72, y: 35, label: 'Чукотка' },
      { x: 88, y: 30, label: 'Мыс Дежнёва' },
      { x: 80, y: 38, label: 'Анадырь' }
    ],
    image: 'https://cdn.poehali.dev/projects/8853b4ba-f903-42f5-8f29-b098ca8a57a3/files/8b964428-0101-4c49-81bd-20d70f636089.jpg'
  },
  {
    id: 3,
    name: 'Фёдор Литке',
    years: '1797-1882',
    expedition: 'Исследования Новой Земли',
    period: '1821-1824',
    yearStart: 1821,
    yearEnd: 1824,
    ship: 'Новая Земля',
    description: 'Русский мореплаватель, исследователь Арктики, географ. Основатель и президент Русского географического общества. Совершил четыре плавания к Новой Земле.',
    fullBio: 'Фёдор Петрович Литке — один из величайших русских географов и мореплавателей XIX века. С 1821 по 1824 год он совершил четыре экспедиции к Новой Земле, детально исследовав её берега и составив точные карты. Позже возглавил кругосветное путешествие на шлюпе "Сенявин". В 1845 году стал одним из основателей Русского географического общества и его первым президентом.',
    achievements: [
      'Четыре экспедиции к Новой Земле (1821-1824)',
      'Кругосветное плавание на шлюпе "Сенявин" (1826-1829)',
      'Основание Русского географического общества (1845)',
      'Составление подробных карт и описаний Арктики'
    ],
    route: [
      { x: 22, y: 52, label: 'Архангельск' },
      { x: 32, y: 38, label: 'Новая Земля' },
      { x: 42, y: 35, label: 'Карское море' },
      { x: 48, y: 32, label: 'Северный путь' }
    ],
    image: 'https://cdn.poehali.dev/projects/8853b4ba-f903-42f5-8f29-b098ca8a57a3/files/e413eddf-46b5-4241-b9af-efe3cb79d744.jpg'
  },
  {
    id: 4,
    name: 'Георгий Седов',
    years: '1877-1914',
    expedition: 'Экспедиция к Северному полюсу',
    period: '1912-1914',
    yearStart: 1912,
    yearEnd: 1914,
    ship: 'Святой мученик Фока',
    description: 'Русский гидрограф, полярный исследователь. Организатор первой русской экспедиции к Северному полюсу. Погиб во время похода к полюсу на Земле Франца-Иосифа.',
    fullBio: 'Георгий Яковлевич Седов — отважный полярный исследователь начала XX века. В 1912 году организовал экспедицию к Северному полюсу на судне "Святой мученик Фока". Несмотря на недостаток средств и провианта, Седов не отступил от своей цели. В феврале 1914 года он отправился к полюсу на собачьих упряжках, но погиб в пути от истощения и цинги. Его имя носят залив, остров и ледокольный пароход.',
    achievements: [
      'Организация первой русской экспедиции к Северному полюсу',
      'Исследование Земли Франца-Иосифа',
      'Гидрографические работы в Арктике',
      'Вдохновил будущие полярные экспедиции'
    ],
    route: [
      { x: 18, y: 55, label: 'Архангельск' },
      { x: 28, y: 42, label: 'Новая Земля' },
      { x: 35, y: 28, label: 'Земля Франца-Иосифа' },
      { x: 40, y: 18, label: 'Путь к полюсу' }
    ],
    image: 'https://cdn.poehali.dev/projects/8853b4ba-f903-42f5-8f29-b098ca8a57a3/files/8b964428-0101-4c49-81bd-20d70f636089.jpg'
  },
  {
    id: 5,
    name: 'Владимир Русанов',
    years: '1875-1913',
    expedition: 'Экспедиция на Шпицберген',
    period: '1912-1913',
    yearStart: 1912,
    yearEnd: 1913,
    ship: 'Геркулес',
    description: 'Русский геолог и полярный исследователь. Исследовал Новую Землю и Шпицберген. Пропал без вести в экспедиции по Северному морскому пути.',
    fullBio: 'Владимир Александрович Русанов — геолог, арктический исследователь и мечтатель. Изучал геологию Новой Земли и организовал несколько экспедиций на Шпицберген, где обнаружил месторождения угля. В 1912 году на судне "Геркулес" отправился в грандиозную экспедицию по Северному морскому пути. После остановки на Шпицбергене экспедиция направилась на восток и пропала без вести. Останки участников были найдены лишь в 1930-е годы.',
    achievements: [
      'Исследование геологии Новой Земли',
      'Открытие угольных месторождений на Шпицбергене',
      'Пионер освоения Северного морского пути',
      'Научные работы по арктической геологии'
    ],
    route: [
      { x: 15, y: 50, label: 'Шпицберген' },
      { x: 32, y: 40, label: 'Новая Земля' },
      { x: 48, y: 35, label: 'Карское море' },
      { x: 62, y: 32, label: 'Таймыр' }
    ],
    image: 'https://cdn.poehali.dev/projects/8853b4ba-f903-42f5-8f29-b098ca8a57a3/files/e413eddf-46b5-4241-b9af-efe3cb79d744.jpg'
  },
  {
    id: 6,
    name: 'Фаддей Беллинсгаузен',
    years: '1778-1852',
    expedition: 'Первая русская антарктическая экспедиция',
    period: '1819-1821',
    yearStart: 1819,
    yearEnd: 1821,
    ship: 'Восток и Мирный',
    description: 'Российский мореплаватель немецкого происхождения, адмирал. Руководитель первой русской антарктической экспедиции, открывшей Антарктиду.',
    fullBio: 'Фаддей Фаддеевич Беллинсгаузен — один из величайших мореплавателей в истории России. В 1819-1821 годах возглавил первую русскую кругосветную антарктическую экспедицию на шлюпах "Восток" и "Мирный". 28 января 1820 года экспедиция достигла берегов Антарктиды, став первооткрывателями шестого континента. Также открыл 29 островов и один коралловый риф. Хотя прославился антарктическими открытиями, участвовал и в арктических плаваниях.',
    achievements: [
      'Открытие Антарктиды (28 января 1820)',
      'Открытие 29 островов в южных морях',
      'Кругосветное плавание длительностью 751 день',
      'Составление точных морских карт полярных регионов'
    ],
    route: [
      { x: 12, y: 58, label: 'Кронштадт' },
      { x: 28, y: 48, label: 'Северные воды' },
      { x: 38, y: 38, label: 'Арктика' },
      { x: 45, y: 32, label: 'Полярный круг' }
    ],
    image: 'https://cdn.poehali.dev/projects/8853b4ba-f903-42f5-8f29-b098ca8a57a3/files/e413eddf-46b5-4241-b9af-efe3cb79d744.jpg'
  }
];

const historicalPeriods = [
  {
    year: 1648,
    event: 'Семён Дежнёв проходит Берингов пролив',
    description: 'Первое документированное прохождение пролива между Азией и Америкой. Дежнёв на кочах обогнул Чукотский полуостров, доказав, что материки разделены.',
    explorers: ['Семён Дежнёв']
  },
  {
    year: 1725,
    event: 'Первая Камчатская экспедиция Беринга',
    description: 'Исследование восточного побережья Камчатки и поиск пути в Америку. Беринг построил корабль и исследовал берега Тихого океана.',
    explorers: ['Витус Беринг']
  },
  {
    year: 1733,
    event: 'Великая Северная экспедиция',
    description: 'Крупнейшая исследовательская экспедиция XVIII века по изучению Сибири и Арктики. Продолжалась 10 лет, участвовало более 600 человек.',
    explorers: ['Витус Беринг']
  },
  {
    year: 1820,
    event: 'Открытие Антарктиды Беллинсгаузеном',
    description: 'Первая русская антарктическая экспедиция достигает берегов шестого континента. Одно из величайших географических открытий XIX века.',
    explorers: ['Фаддей Беллинсгаузен']
  },
  {
    year: 1821,
    event: 'Экспедиции Литке к Новой Земле',
    description: 'Начало систематических исследований Новой Земли. Литке составил детальные карты архипелага и описал природу региона.',
    explorers: ['Фёдор Литке']
  },
  {
    year: 1912,
    event: 'Полярные экспедиции начала XX века',
    description: 'Героическая эпоха полярных исследований. Седов и Русанов организуют экспедиции к Северному полюсу и по Северному морскому пути.',
    explorers: ['Георгий Седов', 'Владимир Русанов']
  }
];

const Index = () => {
  const [selectedExplorer, setSelectedExplorer] = useState(explorers[0]);
  const [timelineValue, setTimelineValue] = useState([1725]);
  const [activeSection, setActiveSection] = useState('map');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const getCurrentPeriod = (year: number) => {
    if (year < 1700) return historicalPeriods[0];
    if (year < 1730) return historicalPeriods[1];
    if (year < 1800) return historicalPeriods[2];
    if (year < 1821) return historicalPeriods[3];
    if (year < 1900) return historicalPeriods[4];
    return historicalPeriods[5];
  };

  const getActiveExplorers = (year: number) => {
    return explorers.filter(
      (explorer) => year >= explorer.yearStart && year <= explorer.yearEnd
    );
  };

  const activeExplorers = getActiveExplorers(timelineValue[0]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-4 border-secondary bg-card shadow-lg relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/8853b4ba-f903-42f5-8f29-b098ca8a57a3/files/d28e29d6-1843-4489-8bb9-8aab33a50fe2.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-3">
                Арктические экспедиции
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Великие русские географические открытия XVII-XX веков
              </p>
            </div>
            <div className="text-7xl">⚓</div>
          </div>
        </div>
      </header>

      <nav className="bg-secondary/20 border-b-2 border-secondary sticky top-0 z-10 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'map', label: 'Карта', icon: 'Map' },
              { id: 'explorers', label: 'Мореплаватели', icon: 'Users' },
              { id: 'history', label: 'История', icon: 'BookOpen' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-4 transition-all font-medium whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-card border-b-4 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                }`}
              >
                <Icon name={section.icon} size={20} />
                <span className="text-lg">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'map' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="border-4 border-secondary shadow-2xl overflow-hidden">
              <CardContent className="p-4 md:p-8">
                <div className="aspect-[16/9] relative rounded-lg border-4 border-accent/30 overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://cdn.poehali.dev/projects/8853b4ba-f903-42f5-8f29-b098ca8a57a3/files/d28e29d6-1843-4489-8bb9-8aab33a50fe2.jpg)`,
                    backgroundBlendMode: 'multiply',
                    backgroundColor: 'rgba(245, 230, 211, 0.7)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
                    <div className="absolute top-4 left-4 bg-card/90 px-4 py-2 rounded border-2 border-primary/20">
                      <p className="text-xs font-bold text-primary tracking-widest">КАРТА АРКТИКИ</p>
                      <p className="text-xs text-muted-foreground">XVII-XX ВЕКА</p>
                    </div>
                    
                    <svg className="absolute inset-0 w-full h-full">
                      {activeExplorers.map((explorer) => (
                        <g 
                          key={explorer.id} 
                          opacity={selectedExplorer.id === explorer.id ? 1 : 0.4}
                          className="transition-all duration-700"
                        >
                          <path
                            d={`M ${explorer.route.map((p) => `${p.x}% ${p.y}%`).join(' L ')}`}
                            stroke={selectedExplorer.id === explorer.id ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
                            strokeWidth={selectedExplorer.id === explorer.id ? "4" : "2"}
                            fill="none"
                            strokeDasharray={selectedExplorer.id === explorer.id ? "10,5" : "5,3"}
                            className="transition-all duration-700"
                            style={{
                              filter: selectedExplorer.id === explorer.id ? 'drop-shadow(0 0 8px hsl(var(--primary)))' : 'none'
                            }}
                          />
                          {explorer.route.map((point, idx) => (
                            <g key={idx}>
                              <circle
                                cx={`${point.x}%`}
                                cy={`${point.y}%`}
                                r={
                                  selectedExplorer.id === explorer.id
                                    ? idx === 0
                                      ? "10"
                                      : idx === explorer.route.length - 1
                                      ? "12"
                                      : "6"
                                    : "4"
                                }
                                fill={selectedExplorer.id === explorer.id ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
                                stroke="hsl(var(--background))"
                                strokeWidth="2"
                                className="transition-all duration-500 cursor-pointer"
                                onClick={() => {
                                  setSelectedExplorer(explorer);
                                  setDialogOpen(true);
                                }}
                                onMouseEnter={() => setHoveredPoint(idx)}
                                onMouseLeave={() => setHoveredPoint(null)}
                                style={{
                                  filter: selectedExplorer.id === explorer.id ? 'drop-shadow(0 0 6px hsl(var(--primary)))' : 'none'
                                }}
                              />
                              {hoveredPoint === idx && selectedExplorer.id === explorer.id && (
                                <g>
                                  <rect
                                    x={`${point.x}%`}
                                    y={`${point.y - 8}%`}
                                    width="80"
                                    height="24"
                                    rx="4"
                                    fill="hsl(var(--card))"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth="2"
                                    transform="translate(-40, -24)"
                                  />
                                  <text
                                    x={`${point.x}%`}
                                    y={`${point.y - 8}%`}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-xs font-bold fill-primary"
                                    transform="translate(0, -12)"
                                  >
                                    {point.label}
                                  </text>
                                </g>
                              )}
                            </g>
                          ))}
                        </g>
                      ))}
                    </svg>

                    <div className="absolute bottom-4 right-4 bg-card/90 p-3 rounded border-2 border-accent/30 max-w-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Compass" size={20} className="text-primary" />
                        <span className="text-sm font-bold text-primary">Активные экспедиции</span>
                      </div>
                      <div className="space-y-1">
                        {activeExplorers.length > 0 ? (
                          activeExplorers.map((exp) => (
                            <div 
                              key={exp.id} 
                              className={`text-xs px-2 py-1 rounded cursor-pointer transition-all ${
                                selectedExplorer.id === exp.id 
                                  ? 'bg-primary text-primary-foreground font-bold' 
                                  : 'text-muted-foreground hover:bg-secondary/20'
                              }`}
                              onClick={() => setSelectedExplorer(exp)}
                            >
                              {exp.name}
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-muted-foreground italic">Нет активных экспедиций в этот период</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                      <Icon name="Clock" size={24} />
                      Временная шкала
                    </h3>
                    <Badge variant="outline" className="text-lg px-4 py-2 font-bold border-accent text-accent-foreground">
                      {timelineValue[0]} год
                    </Badge>
                  </div>
                  
                  <Slider
                    value={timelineValue}
                    onValueChange={setTimelineValue}
                    min={1640}
                    max={1920}
                    step={5}
                    className="my-6"
                  />

                  <Card className="bg-gradient-to-br from-secondary/5 via-secondary/10 to-accent/5 border-2 border-secondary">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Icon name="Calendar" size={32} className="text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-primary mb-2">
                            {getCurrentPeriod(timelineValue[0]).event}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {getCurrentPeriod(timelineValue[0]).description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-accent shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-6 flex-col md:flex-row">
                  <div className="w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden border-4 border-secondary">
                    <img 
                      src={selectedExplorer.image} 
                      alt={selectedExplorer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-3">
                      <h3 className="text-3xl font-bold text-primary">
                        {selectedExplorer.name}
                      </h3>
                      <Badge className="bg-primary text-primary-foreground">
                        {selectedExplorer.period}
                      </Badge>
                    </div>
                    <p className="text-lg text-muted-foreground mb-2">
                      {selectedExplorer.years}
                    </p>
                    <p className="text-sm font-semibold text-accent mb-4">
                      Судно: {selectedExplorer.ship}
                    </p>
                    <p className="text-foreground mb-6 leading-relaxed">
                      {selectedExplorer.description}
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-bold text-primary flex items-center gap-2">
                        <Icon name="Award" size={20} />
                        Основные достижения:
                      </h4>
                      <ul className="space-y-2">
                        {selectedExplorer.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent mt-1">▸</span>
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      className="mt-6"
                      onClick={() => setDialogOpen(true)}
                    >
                      <Icon name="Info" size={18} className="mr-2" />
                      Подробнее
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'explorers' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {explorers.map((explorer) => (
              <Card
                key={explorer.id}
                className="border-4 border-secondary hover:border-primary transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 duration-300"
                onClick={() => {
                  setSelectedExplorer(explorer);
                  setDialogOpen(true);
                }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={explorer.image} 
                    alt={explorer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">⚓</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary mb-1">
                        {explorer.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{explorer.years}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Badge variant="outline" className="mb-2">{explorer.period}</Badge>
                    </div>
                    <div>
                      <span className="font-bold text-primary text-sm">Экспедиция: </span>
                      <span className="text-sm text-foreground">{explorer.expedition}</span>
                    </div>
                    <div>
                      <span className="font-bold text-primary text-sm">Судно: </span>
                      <span className="text-sm text-foreground">{explorer.ship}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {explorer.description}
                    </p>
                  </div>
                  <Button className="mt-4 w-full" variant="outline">
                    <Icon name="MapPin" size={16} className="mr-2" />
                    Показать на карте
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeSection === 'history' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="border-4 border-secondary shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Icon name="BookOpen" size={40} className="text-primary" />
                  <h2 className="text-4xl font-bold text-primary">
                    Хронология открытий
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Освоение Арктики русскими мореплавателями — одна из величайших страниц в истории географических открытий. 
                  В суровых условиях полярных широт российские исследователи прокладывали морские пути, наносили на карты 
                  неизведанные территории и расширяли границы известного мира. От казаков-землепроходцев XVII века до 
                  героических экспедиций начала XX века — каждое десятилетие приносило новые открытия.
                </p>

                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary/20"></div>
                  
                  <div className="space-y-8">
                    {historicalPeriods.map((period, idx) => (
                      <div key={idx} className="relative pl-20 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                        <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-background font-bold text-lg border-4 border-background shadow-lg">
                          {period.year}
                        </div>
                        <Card className="border-2 border-accent hover:border-primary transition-all hover:shadow-xl">
                          <CardContent className="p-6">
                            <h3 className="text-2xl font-bold text-primary mb-2">
                              {period.event}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {period.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {period.explorers.map((name) => (
                                <Badge key={name} variant="secondary">
                                  {name}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-accent shadow-xl">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Icon name="Anchor" size={32} />
                  Значение арктических экспедиций
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: 'Globe',
                      title: 'Географические открытия',
                      description: 'Картографирование северных территорий, открытие новых земель и морских путей. Составление первых подробных карт Арктики.'
                    },
                    {
                      icon: 'Ship',
                      title: 'Морское дело',
                      description: 'Развитие полярного кораблестроения, усовершенствование навигационных приборов и методов плавания во льдах.'
                    },
                    {
                      icon: 'Compass',
                      title: 'Научные исследования',
                      description: 'Изучение климата, магнитного поля Земли, океанских течений. Открытие новых видов растений и животных полярных регионов.'
                    },
                    {
                      icon: 'Flag',
                      title: 'Геополитика',
                      description: 'Укрепление позиций России в Арктике и на Дальнем Востоке. Освоение Северного морского пути как стратегической транспортной артерии.'
                    },
                    {
                      icon: 'Users',
                      title: 'Героизм и выносливость',
                      description: 'Демонстрация невероятной силы духа и способности человека преодолевать экстремальные природные условия ради науки и отечества.'
                    },
                    {
                      icon: 'BookOpen',
                      title: 'Культурное наследие',
                      description: 'Вдохновение для литературы, живописи, кинематографа. Формирование образа отважного полярного исследователя в культуре.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-3 p-4 rounded-lg border-2 border-secondary/30 hover:border-primary/50 transition-all hover:bg-secondary/5">
                      <div className="flex items-start gap-3">
                        <Icon name={item.icon} size={28} className="text-accent mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-primary mb-2 text-lg">{item.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="mt-16 border-t-4 border-secondary bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🧭</div>
              <div>
                <p className="text-lg font-bold text-primary">Арктические экспедиции</p>
                <p className="text-sm text-muted-foreground">История русских географических открытий</p>
              </div>
            </div>
            <div className="text-muted-foreground text-sm">
              XVII-XX века • Интерактивная карта
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-primary">
              {selectedExplorer.name}
            </DialogTitle>
            <DialogDescription className="text-lg">
              {selectedExplorer.years} • {selectedExplorer.expedition}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="w-full h-64 rounded-lg overflow-hidden border-4 border-secondary">
              <img 
                src={selectedExplorer.image} 
                alt={selectedExplorer.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-primary text-primary-foreground">
                  {selectedExplorer.period}
                </Badge>
                <Badge variant="outline">
                  Судно: {selectedExplorer.ship}
                </Badge>
              </div>

              <div>
                <h4 className="font-bold text-primary mb-2 text-lg">Биография</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedExplorer.fullBio}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-primary mb-3 text-lg flex items-center gap-2">
                  <Icon name="Award" size={20} />
                  Достижения
                </h4>
                <ul className="space-y-2">
                  {selectedExplorer.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/30">
                      <span className="text-accent text-xl">▸</span>
                      <span className="text-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-primary mb-3 text-lg flex items-center gap-2">
                  <Icon name="MapPin" size={20} />
                  Маршрут экспедиции
                </h4>
                <div className="space-y-2">
                  {selectedExplorer.route.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded bg-accent/5">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <span className="text-foreground">{point.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              className="w-full"
              onClick={() => {
                setDialogOpen(false);
                setActiveSection('map');
              }}
            >
              <Icon name="Map" size={18} className="mr-2" />
              Показать на карте
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
