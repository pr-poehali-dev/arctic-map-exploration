import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';

const explorers = [
  {
    id: 1,
    name: 'Витус Беринг',
    years: '1681-1741',
    expedition: 'Первая Камчатская экспедиция',
    period: '1725-1730',
    description: 'Датский мореплаватель на русской службе. Открыл пролив между Азией и Америкой, доказал, что они не соединены.',
    achievements: ['Открытие пролива Беринга', 'Картографирование побережья Камчатки', 'Экспедиция к Америке'],
    route: [
      { x: 30, y: 45 },
      { x: 65, y: 35 },
      { x: 85, y: 30 }
    ]
  },
  {
    id: 2,
    name: 'Семён Дежнёв',
    years: '1605-1673',
    expedition: 'Плавание из Колымы в Анадырь',
    period: '1648',
    description: 'Первым из европейцев прошёл Берингов пролив за 80 лет до Беринга, открыв крайнюю восточную точку Азии.',
    achievements: ['Первое прохождение Берингова пролива', 'Открытие мыса Дежнёва', 'Основание Анадырского острога'],
    route: [
      { x: 55, y: 40 },
      { x: 75, y: 30 },
      { x: 88, y: 28 }
    ]
  },
  {
    id: 3,
    name: 'Фёдор Литке',
    years: '1797-1882',
    expedition: 'Кругосветное путешествие',
    period: '1826-1829',
    description: 'Русский мореплаватель, исследователь Арктики, основатель Русского географического общества.',
    achievements: ['Исследование Новой Земли', 'Кругосветная экспедиция на шлюпе "Сенявин"', 'Основание РГО'],
    route: [
      { x: 20, y: 50 },
      { x: 35, y: 35 },
      { x: 48, y: 30 }
    ]
  },
  {
    id: 4,
    name: 'Фаддей Беллинсгаузен',
    years: '1778-1852',
    expedition: 'Антарктическая экспедиция',
    period: '1819-1821',
    description: 'Хотя знаменит открытием Антарктиды, также исследовал арктические воды и участвовал в северных экспедициях.',
    achievements: ['Открытие Антарктиды', 'Картографические работы', 'Исследование полярных вод'],
    route: [
      { x: 15, y: 55 },
      { x: 30, y: 42 },
      { x: 40, y: 35 }
    ]
  }
];

const historicalPeriods = [
  {
    year: 1648,
    event: 'Семён Дежнёв проходит Берингов пролив',
    description: 'Первое документированное прохождение пролива между Азией и Америкой'
  },
  {
    year: 1725,
    event: 'Первая Камчатская экспедиция Беринга',
    description: 'Исследование восточного побережья Камчатки и поиск пути в Америку'
  },
  {
    year: 1733,
    event: 'Великая Северная экспедиция',
    description: 'Крупнейшая исследовательская экспедиция XVIII века по изучению Сибири и Арктики'
  },
  {
    year: 1820,
    event: 'Эпоха великих полярных экспедиций',
    description: 'Интенсивное исследование арктических территорий российскими мореплавателями'
  }
];

const Index = () => {
  const [selectedExplorer, setSelectedExplorer] = useState(explorers[0]);
  const [timelineValue, setTimelineValue] = useState([1725]);
  const [activeSection, setActiveSection] = useState('map');

  const getCurrentPeriod = (year: number) => {
    if (year < 1700) return historicalPeriods[0];
    if (year < 1730) return historicalPeriods[1];
    if (year < 1800) return historicalPeriods[2];
    return historicalPeriods[3];
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-4 border-secondary bg-card shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold text-primary mb-2">
                Арктические экспедиции
              </h1>
              <p className="text-muted-foreground text-lg">
                Путешествия русских мореплавателей XIX-XX веков
              </p>
            </div>
            <div className="text-6xl">⚓</div>
          </div>
        </div>
      </header>

      <nav className="bg-secondary/20 border-b-2 border-secondary sticky top-0 z-10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'map', label: 'Карта', icon: 'Map' },
              { id: 'explorers', label: 'Мореплаватели', icon: 'Users' },
              { id: 'history', label: 'История', icon: 'BookOpen' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-4 transition-all font-medium ${
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
              <CardContent className="p-8">
                <div className="aspect-[16/9] relative bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 rounded-lg border-4 border-accent/30 overflow-hidden">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(139, 115, 85, 0.1) 35px, rgba(139, 115, 85, 0.1) 36px),
                      repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(139, 115, 85, 0.1) 35px, rgba(139, 115, 85, 0.1) 36px)
                    `
                  }}>
                    <div className="absolute top-4 left-4 text-xs font-bold text-primary/60 tracking-widest">
                      КАРТА АРКТИКИ
                    </div>
                    
                    <svg className="absolute inset-0 w-full h-full">
                      {explorers.map((explorer) => (
                        <g key={explorer.id} opacity={selectedExplorer.id === explorer.id ? 1 : 0.3}>
                          <path
                            d={`M ${explorer.route.map((p) => `${p.x}% ${p.y}%`).join(' L ')}`}
                            stroke={selectedExplorer.id === explorer.id ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="8,4"
                            className="transition-all duration-500"
                          />
                          {explorer.route.map((point, idx) => (
                            <circle
                              key={idx}
                              cx={`${point.x}%`}
                              cy={`${point.y}%`}
                              r={idx === 0 ? "8" : idx === explorer.route.length - 1 ? "10" : "5"}
                              fill={selectedExplorer.id === explorer.id ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
                              stroke="hsl(var(--background))"
                              strokeWidth="2"
                              className="transition-all duration-500 cursor-pointer hover:r-12"
                              onClick={() => setSelectedExplorer(explorer)}
                            />
                          ))}
                        </g>
                      ))}
                    </svg>

                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/4 left-1/4 text-primary/20 text-sm font-bold">
                        НОВАЯ ЗЕМЛЯ
                      </div>
                      <div className="absolute top-1/3 right-1/4 text-primary/20 text-sm font-bold">
                        ЧУКОТКА
                      </div>
                      <div className="absolute bottom-1/3 left-1/3 text-primary/20 text-sm font-bold">
                        КАМЧАТКА
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                      <Icon name="Clock" size={24} />
                      Временная шкала
                    </h3>
                    <span className="text-xl font-bold text-accent">{timelineValue[0]} год</span>
                  </div>
                  
                  <Slider
                    value={timelineValue}
                    onValueChange={setTimelineValue}
                    min={1640}
                    max={1850}
                    step={10}
                    className="my-6"
                  />

                  <Card className="bg-secondary/10 border-2 border-secondary">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Icon name="Calendar" size={32} className="text-primary mt-1" />
                        <div>
                          <h4 className="text-xl font-bold text-primary mb-2">
                            {getCurrentPeriod(timelineValue[0]).event}
                          </h4>
                          <p className="text-muted-foreground">
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
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="text-6xl">🧭</div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-primary mb-3">
                      {selectedExplorer.name}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-2">
                      {selectedExplorer.years} • {selectedExplorer.period}
                    </p>
                    <p className="text-foreground mb-4 leading-relaxed">
                      {selectedExplorer.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-bold text-primary">Основные достижения:</h4>
                      <ul className="space-y-1">
                        {selectedExplorer.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent mt-1">▸</span>
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'explorers' && (
          <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
            {explorers.map((explorer) => (
              <Card
                key={explorer.id}
                className="border-4 border-secondary hover:border-primary transition-all cursor-pointer shadow-lg hover:shadow-2xl"
                onClick={() => {
                  setSelectedExplorer(explorer);
                  setActiveSection('map');
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">⚓</div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-1">
                        {explorer.name}
                      </h3>
                      <p className="text-muted-foreground">{explorer.years}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="font-bold text-primary">Экспедиция: </span>
                      <span className="text-foreground">{explorer.expedition}</span>
                    </div>
                    <div>
                      <span className="font-bold text-primary">Период: </span>
                      <span className="text-foreground">{explorer.period}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {explorer.description}
                    </p>
                  </div>
                  <Button className="mt-4 w-full" variant="outline">
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
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Icon name="BookOpen" size={40} className="text-primary" />
                  <h2 className="text-4xl font-bold text-primary">
                    Хронология открытий
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Освоение Арктики русскими мореплавателями — одна из величайших страниц в истории географических открытий. 
                  В суровых условиях полярных широт российские исследователи прокладывали морские пути, наносили на карты 
                  неизведанные территории и расширяли границы известного мира.
                </p>

                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary/20"></div>
                  
                  <div className="space-y-8">
                    {historicalPeriods.map((period, idx) => (
                      <div key={idx} className="relative pl-20">
                        <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-background font-bold text-lg border-4 border-background">
                          {period.year}
                        </div>
                        <Card className="border-2 border-accent">
                          <CardContent className="p-6">
                            <h3 className="text-2xl font-bold text-primary mb-2">
                              {period.event}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {period.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-accent shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Icon name="Anchor" size={32} />
                  Значение арктических экспедиций
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="Globe" size={24} className="text-accent mt-1" />
                      <div>
                        <h4 className="font-bold text-primary mb-1">Географические открытия</h4>
                        <p className="text-muted-foreground">
                          Картографирование северных территорий и морских путей
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="Ship" size={24} className="text-accent mt-1" />
                      <div>
                        <h4 className="font-bold text-primary mb-1">Морское дело</h4>
                        <p className="text-muted-foreground">
                          Развитие кораблестроения и навигационных технологий
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="Compass" size={24} className="text-accent mt-1" />
                      <div>
                        <h4 className="font-bold text-primary mb-1">Научные исследования</h4>
                        <p className="text-muted-foreground">
                          Изучение климата, флоры и фауны полярных регионов
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="Flag" size={24} className="text-accent mt-1" />
                      <div>
                        <h4 className="font-bold text-primary mb-1">Геополитика</h4>
                        <p className="text-muted-foreground">
                          Укрепление позиций России в Арктике и на Дальнем Востоке
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="mt-16 border-t-4 border-secondary bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🧭</div>
              <div>
                <p className="text-lg font-bold text-primary">Арктические экспедиции</p>
                <p className="text-sm text-muted-foreground">История русских географических открытий</p>
              </div>
            </div>
            <div className="text-muted-foreground text-sm">
              XIX-XX века
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
